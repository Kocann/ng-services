(function () {

    angular.module('app')
        .controller('EditBookController', ['$routeParams', 'books', '$cookies', '$cookieStore', "dataService", '$location', "$log", EditBookController]);

    function EditBookController($routeParams, books, $cookies, $cookieStore, dataService, $location, $log) {

        var vm = this;

        // vm.currentBook = books.filter(function(item) {
        //     return item.book_id == $routeParams.bookID;
        // })[0]; zamiast tego dać to poniżej:

        dataService.getBookByID($routeParams.bookID)
                   .then(getBookSuccess)
                   .catch(getBookError);
        
        function getBookSuccess(book){
            vm.currentBook = book;
            $cookieStore.put('lastEdited', vm.currentBook);

        }

        function getBookError(reason){
            $log.error(reason);
        }

        vm.saveBook = function() {
            dataService.updateBook(vm.currentBook)
                .then(updateSuccesBook)
                .catch(updateErrorBook);
        };

        function updateSuccesBook(message){
            $log.info(message);
            $location.path('/');
        }
        function updateErrorBook(errorMessage){
            $log.error(errorMessage);
        }


        vm.setAsFavorite = function() {

            $cookies.favoriteBook = vm.currentBook.title;

        };


    }

}());