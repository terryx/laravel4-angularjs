angular.module('Service', [])
    .service('pagination', [function () {

        this.model = {};

        this.make = function (counts, query) {
            if (!query) {
                query = '';
            }

            this.model.maxSize = 20;
            this.model.noOfPages = Math.ceil(counts / this.model.maxSize);
            this.model.currentPage = 1;
            this.model.query = query;
        };
//        var storage = {};
//        var cache = {};
//        return {
//            rows: {},
//            cache: {
//                set: function (id, data) {
//                    cache[id] = data;
//                    return;
//                },
//                get: function (id) {
//                    if (cache[id]) {
//                        return cache[id];
//                    } else {
//                        return null;
//                    }
//                },
//                clear: function () {
//                    return cache = {};
//                }
//            },
//            setData: function (data) {
//                if (undefined !== data) {
//                    storage = data;
//                }
//                return;
//            },
//            getData: function () {
//                return storage;
//            },
//            video: {
//                type: ['Music', 'Motivation', 'Tech', 'Jokes'],
//                artist: [
//                    { id: 'ImagineDragonsVEVO', name: 'Imagine Dragons' },
//                    { id: 'PitbullVEVO', name: 'Pitbull' },
//                    { id: 'linkinparktv', name: 'Linkin Park' }
//                ]
//            }
//        }

    }]).
    service('dataStorage', [function () {
        this.cache = {};

        this.setCache = function (id, data) {
            this.cache[id] = data;
            return;
        }

        this.getCache = function (id) {
            if (this.cache[id]) {
                return this.cache[id];
            } else {
                return null;
            }
        }
    }]);