(function () {
  'use strict';

  describe('Centros Route Tests', function () {
    // Initialize global variables
    var $scope,
      CentrosService;

    // We can start by loading the main application module
    beforeEach(module(ApplicationConfiguration.applicationModuleName));

    // The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
    // This allows us to inject a service but then attach it to a variable
    // with the same name as the service.
    beforeEach(inject(function ($rootScope, _CentrosService_) {
      // Set a new global scope
      $scope = $rootScope.$new();
      CentrosService = _CentrosService_;
    }));

    describe('Route Config', function () {
      describe('Main Route', function () {
        var mainstate;
        beforeEach(inject(function ($state) {
          mainstate = $state.get('centros');
        }));

        it('Should have the correct URL', function () {
          expect(mainstate.url).toEqual('/centros');
        });

        it('Should be abstract', function () {
          expect(mainstate.abstract).toBe(true);
        });

        it('Should have template', function () {
          expect(mainstate.template).toBe('<ui-view/>');
        });
      });

      describe('View Route', function () {
        var viewstate,
          CentrosController,
          mockCentro;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          viewstate = $state.get('centros.view');
          $templateCache.put('modules/centros/client/views/view-centro.client.view.html', '');

          // create mock Centro
          mockCentro = new CentrosService({
            _id: '525a8422f6d0f87f0e407a33',
            name: 'Centro Name'
          });

          // Initialize Controller
          CentrosController = $controller('CentrosController as vm', {
            $scope: $scope,
            centroResolve: mockCentro
          });
        }));

        it('Should have the correct URL', function () {
          expect(viewstate.url).toEqual('/:centroId');
        });

        it('Should have a resolve function', function () {
          expect(typeof viewstate.resolve).toEqual('object');
          expect(typeof viewstate.resolve.centroResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(viewstate, {
            centroId: 1
          })).toEqual('/centros/1');
        }));

        it('should attach an Centro to the controller scope', function () {
          expect($scope.vm.centro._id).toBe(mockCentro._id);
        });

        it('Should not be abstract', function () {
          expect(viewstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(viewstate.templateUrl).toBe('modules/centros/client/views/view-centro.client.view.html');
        });
      });

      describe('Create Route', function () {
        var createstate,
          CentrosController,
          mockCentro;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          createstate = $state.get('centros.create');
          $templateCache.put('modules/centros/client/views/form-centro.client.view.html', '');

          // create mock Centro
          mockCentro = new CentrosService();

          // Initialize Controller
          CentrosController = $controller('CentrosController as vm', {
            $scope: $scope,
            centroResolve: mockCentro
          });
        }));

        it('Should have the correct URL', function () {
          expect(createstate.url).toEqual('/create');
        });

        it('Should have a resolve function', function () {
          expect(typeof createstate.resolve).toEqual('object');
          expect(typeof createstate.resolve.centroResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(createstate)).toEqual('/centros/create');
        }));

        it('should attach an Centro to the controller scope', function () {
          expect($scope.vm.centro._id).toBe(mockCentro._id);
          expect($scope.vm.centro._id).toBe(undefined);
        });

        it('Should not be abstract', function () {
          expect(createstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(createstate.templateUrl).toBe('modules/centros/client/views/form-centro.client.view.html');
        });
      });

      describe('Edit Route', function () {
        var editstate,
          CentrosController,
          mockCentro;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          editstate = $state.get('centros.edit');
          $templateCache.put('modules/centros/client/views/form-centro.client.view.html', '');

          // create mock Centro
          mockCentro = new CentrosService({
            _id: '525a8422f6d0f87f0e407a33',
            name: 'Centro Name'
          });

          // Initialize Controller
          CentrosController = $controller('CentrosController as vm', {
            $scope: $scope,
            centroResolve: mockCentro
          });
        }));

        it('Should have the correct URL', function () {
          expect(editstate.url).toEqual('/:centroId/edit');
        });

        it('Should have a resolve function', function () {
          expect(typeof editstate.resolve).toEqual('object');
          expect(typeof editstate.resolve.centroResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(editstate, {
            centroId: 1
          })).toEqual('/centros/1/edit');
        }));

        it('should attach an Centro to the controller scope', function () {
          expect($scope.vm.centro._id).toBe(mockCentro._id);
        });

        it('Should not be abstract', function () {
          expect(editstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(editstate.templateUrl).toBe('modules/centros/client/views/form-centro.client.view.html');
        });

        xit('Should go to unauthorized route', function () {

        });
      });

    });
  });
}());
