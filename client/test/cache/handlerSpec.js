describe('Core.Cache.Handler', function() {

	var cache = null;
	var cacheStorage = null;
	var cacheFactory = null;
	beforeEach(function() {
		cacheStorage = oc.create('$MapStorage');
		cacheFactory = oc.create('$CacheFactory');
		cache = oc.create('Core.Cache.Handler', [cacheStorage, cacheFactory, {enabled: true, ttl: 1000}]);
		cache.set('aaa', 123);
		jasmine.clock().install();
	});

	afterEach(function() {
		jasmine.clock().uninstall();
	});

	it('should store value for key', function() {
		jasmine.clock().mockDate(new Date());
		cache.set('bbb', 456);
		cache.set('ccc', 321, 2000);

		jasmine.clock().tick(1001);

		expect(cache.has('aaa')).toBe(false);
		expect(cache.has('bbb')).toBe(false);
		expect(cache.has('ccc')).toBe(true);
	});

	describe('set method', function() {

		it('should store deep clone', function() {
			var object = {
				number: 1,
				boolean: true,
				string: 'text',
				array: [1, 2, 3, [4, 5]],
				object: {
					number: 1,
					boolean: true,
					string: 'text',
					array: [1, 2, 3, [4, 5], {number: 1}]
				}
			};

			cache.set('object', object);

			object.object.number = 2;
			object.object.array[3] = 4;
			object.object.array[4].number = 2;

			var cacheObject = cache.get('object');

			expect(cacheObject.object.number).toEqual(1);
			expect(cacheObject.object.array[3]).toEqual([4, 5]);
			expect(cacheObject.object.array[4].number).toEqual(1);
		});

		it('should returns deep clone', function() {
			var object = {
				number: 1,
				boolean: true,
				string: 'text',
				array: [1, 2, 3, [4, 5]],
				object: {
					number: 1,
					boolean: true,
					string: 'text',
					array: [1, 2, 3, [4, 5], {number: 1}]
				}
			};

			cache.set('object', object);
			var cloneObject = cache.get('object');

			cloneObject.object.number = 2;
			cloneObject.object.array[3] = 4;
			cloneObject.object.array[4].number = 2;

			expect(cache.get('object')).toEqual(object);
		});
	});

	it('should return false for undefined cacheEntry', function() {
		spyOn(cacheStorage, 'has')
			.and
			.returnValue(true);

		expect(cache.has('bbb')).toBe(false);
	});

	it('should return cached value for exist key', function() {
		expect(cache.get('aaa')).toEqual(123);
	});

	it('should return null for not exist key', function() {
		expect(cache.get('bbb')).toEqual(null);
	});

	it('should cleared cache', function() {
		cache.clear();

		expect(cache.has('aaa')).toBe(false);
	});

	it('should cache disabled', function() {
		cache.disable();

		expect(cache.has('aaa')).toBe(false);
	});

	it('should serialize and deserialize', function() {
		var serialization = cache.serialize();
		cache.clear();
		cache.deserialize(serialization);

		expect(cache.has('aaa')).toBe(false);
	});

	it('should throw error for serialize if value is instance of Promise', function() {
		cache.set('promise', Promise.resolve('promise'));

		expect(function() {
			cache.serialize();
		}).toThrow();
	});
});