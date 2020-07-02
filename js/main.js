
var getloser = new getLoser;

function getLoser() {

    this.applicants = []; //if "this" is not used in a constructor function (setting the function inside a var) the "this" would make reference to the entire window, not the function itself.

    this.init = function () { //the init function is created inside the getLoser function. In case there's another INIT function globaly.
        this.addApplicants();
        this.getRandomUser();
        this.runAgain();
        this.startOver();
    }

    this.showList = function () {
        var parent = document.querySelector('.applicant_list_wrapper');
        var template = '';

        for (var i = 0; i < this.applicants.length; i++) {
            template += '<span class="name-tag" data-id="' + i + '">' + this.applicants[i] + '</span>'
        }
        parent.innerHTML = '';
        parent.insertAdjacentHTML('afterbegin',template);
        this.deleteOne();
    }

    this.addApplicants = function () {
        var $this = this;

        function generateList(input) {
            var name = input.value;
            if ($this.checkValid(name.toLowerCase())) {
                $this.applicants.push(name);
                //console.log($this.applicants); //Shows the array, optional.
                input.value = '';
                $this.showList();
            } else {
                alert('Name already on the list or empty')
            }
        }

        var addBtn = document.querySelector('#add_applicant');

        addBtn.addEventListener('click', function () {
            var input = document.querySelector('#applicant_value');
            generateList(input)
        })
    }
    this.checkValid = function (value) {

        if (!this.applicants.includes(value) && value != '') {
            return true
        }return false; //default value, the ELSE is not neccesary      
    }
    
    this.getRandomUser = function(){
        var $this = this;
        var resultsButton = document.querySelector('#show_results');

        function showLoser(){
            var resultsContainer = document.querySelector('.results_container');
            var applicantsContainer = document.querySelector('.applicant_container');

            applicantsContainer.className += ' hidden';
            resultsContainer.className = 'results_container';
            $this.showRandomUser();
        }

        resultsButton.addEventListener('click',function(e){
            if($this.applicants.length >1){
                showLoser();
            }else{
                alert('More than one user is required');
            }
        })
    }

    this.showRandomUser = function(){
        var resultsContainer = document.querySelector('.result');
        var rand = this.applicants[Math.floor(Math.random() * this.applicants.length)] //Floor rounds up.
        
        resultsContainer.innerHTML= '';
        resultsContainer.insertAdjacentHTML('afterbegin','<h3>'+rand+'</h3>')
    }

    this.runAgain = function(){
        var $this = this;
        var runAgainButton = document.querySelector('.run_again');

        runAgainButton.addEventListener('click',function(e){
            $this.showRandomUser();
        })

    }

    this.startOver= function(){
        var $this = this;
        var startOverButton = document.querySelector('.start_again');

        startOverButton.addEventListener('click',function(e){
            var resultsContainer = document.querySelector('.results_container');
            var applicantsContainer = document.querySelector('.applicant_container');
            var applicantsWrapper = document.querySelector('.applicant_list_wrapper');

            resultsContainer.className = 'results_container hidden';
            applicantsContainer.className = 'applicant_container';
            applicantsWrapper.innerHTML= '';

            $this.applicants = [];

        })
    }

    this.deleteOne = function(){
        var $this = this;
        var item = document.querySelectorAll('.name-tag');
        
        function removeIt(element){
            var attr = parseInt(element.getAttribute('data-id'));
            $this.applicants.splice(attr,1)
            $this.showList();
        }
        
        for(var i =0;i < item.length;i++){
            item[i].addEventListener('click',function(e){
                removeIt(this) //we cannot use the item[i], i don't know why...
            })
        }
    }
}

getloser.init();    