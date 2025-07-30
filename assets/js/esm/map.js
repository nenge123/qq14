const isTouchDevice = 'ontouchstart' in window;
const map = {
	dragOriginX: 0,
	dragOriginY: 0,
	dragging: null,
	pixelsPerGrid: 50,
	canvasSize: 381,
	canvasScale: 381 / 2048,
	stateFillStyles: {
		active: 'rgba(60, 99, 60, 0.7)',
		spawning: 'rgba(150, 72, 51, 0.7)'
	},

	setup($wrapper) {
		const M = this;
		var $container = $('.map-container', $wrapper);
		if (!$container.length)
			return;

		var view = $wrapper.data('view');
		var location = view.location;
		var size = M.pixelsPerGrid * location.size * M.canvasScale;

		if (!isTouchDevice) {
			$container.bind('mousemove', M.mousemove);
			$container.bind('mouseout', M.mouseout);
		}

		$container.data('location', location);

		// Paint the image
		var $base = $('canvas.base', $container);

		gt.cache.whenImages([view.image]).done(function () {
			var image = gt.cache.images[view.image];

			// Draw base map image.
			var baseContext = $base[0].getContext('2d');
			baseContext.drawImage(image, 0, 0, M.canvasSize, M.canvasSize);

			// Draw grid tiles.
			baseContext.beginPath();
			baseContext.strokeStyle = 'rgba(50, 50, 50, 0.05)';
			for (var i = 0; i < M.canvasSize; i += size) {
				for (var ii = 0; ii < M.canvasSize; ii += size)
					baseContext.strokeRect(i, ii, size, size);
			}
			baseContext.closePath();

			M.renderPoints($container, view);
		});
	},
	renderPoints($container, view) {
		const M = this;
		var pointScale = 4;

		var points = view.points;
		var size = M.pixelsPerGrid * view.location.size;
		var iconSize = M.pixelsPerGrid * pointScale * M.canvasScale;

		var $points = $('canvas.points', $container);
		var pointContext = $points[0].getContext('2d');

		var imageSources = _.map(view.points, function (p) {
			return { src: p.icon, rarity: p.origin.def.rarity || 1 };
		});

		gt.display.paintItemsWithoutBackground(imageSources).done(function () {
			for (var i = 0; i < view.points.length; i++) {
				var p = view.points[i];
				var img = gt.cache.imagesWithoutBackground[p.icon];
				var progress = p.origin.progress;
				var state = progress ? progress.state : 'dormant';

				if (state != 'dormant') {
					var adj = (iconSize / 2) - 12;
					pointContext.beginPath();
					pointContext.arc(p.x + adj, p.y + adj, p.r * (pointScale / view.location.size) * M.canvasScale * 1.2, 0, Math.PI * 2, false);
					pointContext.fillStyle = M.stateFillStyles[state];
					pointContext.fill();
					pointContext.closePath();
				}

				pointContext.drawImage(img, p.x - (M.pixelsPerGrid / pointScale), p.y - (M.pixelsPerGrid / pointScale), iconSize, iconSize);
			}
		});
	},

	getViewModel(zoneName, coords, radius) {
		const M = this;
		var location = _.find(_.values(gt.location.index), function (l) { return l.name == zoneName; });
		if (!location || !location.parentId)
			return null;

		var view = {
			location: location,
			parent: gt.location.index[location.parentId],
			displayCoords: coords
		};

		var offset = 1;
		var x = (coords[0] - offset) * M.pixelsPerGrid * location.size * M.canvasScale;
		var y = (coords[1] - offset) * M.pixelsPerGrid * location.size * M.canvasScale;
		view.coords = [x, y];

		if (radius)
			view.radius = M.toMapCoordinate(radius, location.size) * Math.PI * 2;
		else {
			view.radius = M.pixelsPerGrid / 2;
			view.radius *= location.size;
		}

		view.image = '../files/maps/' + view.parent.name + '/' + M.sanitizeLocationName(location.name) + '.png';

		return view;
	},

	sanitizeLocationName(name) {
		if (name.indexOf('The Diadem') == 0)
			return 'The Diadem';
		else
			return name;
	},

	toMapCoordinate(value, size) {
		return ((50 / size) * ((value * size) / 2048));
	},

	getGridPosition(e, mapContainer) {
		const M = this;
		var x = e.offsetX + mapContainer.scrollLeft;
		var y = e.offsetY + mapContainer.scrollTop;

		var zoom = Number($('.map', mapContainer).css('zoom') || 1);

		var location = $(mapContainer).data('location');
		var mapX = (x / (M.pixelsPerGrid * zoom)) / location.size;
		var mapY = (y / (M.pixelsPerGrid * zoom)) / location.size;
		return { x: mapX, y: mapY };
	},

	getAbsolutePosition(pos, mapContainer) {
		const M = this;
		var location = $(mapContainer).data('location');
		var pixelsPerGrid = M.pixelsPerGrid * Number($('.map', mapContainer).css('zoom') || 1);
		var scrollX = pos.x * pixelsPerGrid * location.size;
		var scrollY = pos.y * pixelsPerGrid * location.size;
		return { x: scrollX, y: scrollY };
	},

	mousemove(e) {
		const M = map;
		var pos = M.getGridPosition(e, this);
		pos.x /= M.canvasScale;
		pos.y /= M.canvasScale;
		$('.position', this).text(parseInt(pos.x + 1) + ", " + parseInt(pos.y + 1));
	},

	wheel(e) {
		const M = map;
		e.stopPropagation();
		e = e.originalEvent;

		var gridPos = M.getGridPosition(e, this);

		var delta = gt.display.normalizeWheelDelta(e.deltaY) * .0015;

		var $map = $('.map', this);
		var currentZoom = Number($map.css('zoom') || 1);
		var zoom = Math.min(Math.max(currentZoom - delta, 0.1857), 1.75);

		$map.css('zoom', zoom);

		// Zooming shifts location.  Readjust scrollbar to account for changes.
		var absolutePos = M.getAbsolutePosition(gridPos, this);
		this.scrollLeft = absolutePos.x - e.offsetX;
		this.scrollTop = absolutePos.y - e.offsetY;

		return false;
	},

	mouseout(e) {
		// Reset coords when moving the mouse out of the map.
		var $position = $('.position', this);
		$position.empty();
	},

	dragDown(e) {
		const M = map;
		M.dragOriginX = e.pageX;
		M.dragOriginY = e.pageY;
		M.dragging = this;

		$('html')
			.bind('mouseup touchend', M.dragUp)
			.bind('mousemove touchmove', M.dragMove);

		$(this).addClass('dragging');
	},

	dragUp(e) {
		const M = map;
		$('html')
			.unbind('mouseup')
			.unbind('mousemove')
			.unbind('touchup')
			.unbind('touchmove');

		$('.dragging').removeClass('dragging');

		M.dragOriginX = 0;
		M.dragOriginY = 0;
		M.dragging = null;
	},

	dragMove(e) {
		const M = map;
		var x = e.pageX;
		var y = e.pageY;

		var maxDelta = 15;
		var acceleration = 1.15;
		xDelta = Math.min(Math.max(M.dragOriginX - x, -maxDelta), maxDelta) * acceleration;
		yDelta = Math.min(Math.max(M.dragOriginY - y, -maxDelta), maxDelta) * acceleration;

		if (xDelta > 1 || xDelta < 1)
			M.dragging.scrollLeft += xDelta;

		if (yDelta > 1 || yDelta < 1)
			M.dragging.scrollTop += yDelta;

		M.dragOriginX = x;
		M.dragOriginY = y;

		return false;
	},
	render() {
		const M = this;
		if (!gt.bell.settings.maps)
			return;

		// Collect map data.
		var zoneMaps = {};
		var lists = gt.bell.settings.lists;
		for (var i = 0; i < lists.length; i++) {
			var list = lists[i];
			if (!list.active)
				continue;

			var elements = gt.layout.engine.getDisplayedElements(list);
			for (var ii = 0; ii < elements.length; ii++) {
				var $element = $(elements[ii]);
				var view = $element.data('view');
				if (!view.map)
					continue;

				var mapView = zoneMaps[view.map.location.name];
				if (!mapView) {
					mapView = zoneMaps[view.map.location.name] = {
						points: [],
						location: view.map.location,
						image: view.map.image
					};
				}

				mapView.points.push({
					x: view.map.coords[0], y: view.map.coords[1],
					dx: view.map.displayCoords[0], dy: view.map.displayCoords[1],
					r: view.map.radius, icon: view.icon,
					origin: view
				});
			}
		}

		// Display the maps
		var sortedMapKeys = _.keys(zoneMaps).sort();
		var $maps = $('#maps').empty();
		for (var i = 0; i < sortedMapKeys.length; i++) {
			var mapView = zoneMaps[sortedMapKeys[i]];
			mapView.displayCoords = _.map(mapView.points, function (p) { return p.dx + ", " + p.dy }).join("<br/>");

			var $map = $(gt.layout.templates.map(mapView));
			$map.data('view', mapView);
			$maps.append($map);
			M.setup($map);
		}
	}
};
export default map;