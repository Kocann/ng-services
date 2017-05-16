(function() {

    angular.module('app')
        .factory('dataService', ['$q', '$timeout','$http', 'constants', dataService]);


    function dataService($q, $timeout, $http, constants) {

        return {
            getAllBooks: getAllBooks,
            getAllReaders: getAllReaders,
            getBookByID: getBookByID,
            updateBook: updateBook
        };

        function getAllBooks(){
            return $http({
                method: 'GET',
                url: 'api/books',
                headers: {
                    'PS-BookLogger-Version': constants.APP_VERSION
                }
            })
            .then(sendResponseData)
            .catch(sendGetBooksError);
        }

        function sendResponseData(response){
            return response.data;
        }
        function sendGetBooksError(response){
            return $q.reject('error: ' + response.status);
        }

        function getBookByID(bookID){
             return $http({
                method: 'GET',
                url: 'api/books/' + bookID
            })
            .then(sendResponseData)
            .catch(sendGetBooksError);
        }
        function updateBook(book){
            return $http({
                method: 'PUT',
                url: 'api/books/' + book.book_id,
                data: book
            })
            .then(updateBookSuccess)
            .catch(updateBookError);
        }

        function updateBookSuccess(response){
            return "Book updated: " + response.config.data.title;
        }

        function updateBookError(response){
            return $q.reject('Error updating ' + response.status);
        }

        function getAllReaders() {

            var readersArray = [
                {
                    reader_id: 1,
                    name: 'Marie',
                    weeklyReadingGoal: 315,
                    totalMinutesRead: 5600
                },
                {
                    reader_id: 2,
                    name: 'Daniel',
                    weeklyReadingGoal: 210,
                    totalMinutesRead: 3000
                },
                {
                    reader_id: 3,
                    name: 'Lanier',
                    weeklyReadingGoal: 140,
                    totalMinutesRead: 600
                }
            ];

            var deferred = $q.defer();

            $timeout(function() {

                deferred.resolve(readersArray);

            }, 1500);

            return deferred.promise;
        }
    }

}());