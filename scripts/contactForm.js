define('contactForm', ['viewLoader', 'jquery'], function(viewLoader){
    function validateEmail(email) {
        var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2,6})?)$/i;
        return re.test(email);
    }

    function checkFieldAndSend($contactForm, oldStyles){
        var $inputs = $contactForm.find('input'),
            $textareas = $contactForm.find('textarea'),
            $name = $contactForm.find('.name'),
            $email = $contactForm.find('.email'),
            $subject = $contactForm.find('.subject'),
            $msg = $contactForm.find('.message'),
            name = $name.val().trim(),
            email = $email.val().trim(),
            subject = $subject.val().trim(),
            msg = $msg.val().trim(),
            wrongFields = [];
        if(name.length == 0){
            wrongFields.push($name);
        }
        if(!validateEmail(email)){
            wrongFields.push($email)
        }
        if(subject.length == 0){
            wrongFields.push($subject);
        }
        if(msg.length < 5){
            wrongFields.push($msg);
        }

        $inputs.css(oldStyles);
        $textareas.css(oldStyles);
        if(wrongFields.length){
            for(index in wrongFields){
                wrongFields[index].css({
                    'background': '#c72d2d',
                    'border-bottom': '2px solid #992323',
                    'color': '#fff'
                });
            }
        }else{
            $contactForm.html('Loading...');
            $.ajax({
                url: 'php/mailer.php',
                method: 'POST',
                data: {
                    name: name,
                    subject: subject,
                    email: email,
                    msg: msg
                }
            }).success(function(data){
                console.log(data);
                sentSuccessfully($contactForm);
            });
        }
    }

    function sentSuccessfully($contactForm){
        if(localStorage && localStorage.lang == 'en'){
            $.get('data/sentSuccessfully.json', function(data){
                viewLoader($contactForm, 'templates/sentSuccessfullyView.html', data.en);
            });
        }else{
            $.get('data/sentSuccessfully.json', function(data){
                viewLoader($contactForm, 'templates/sentSuccessfullyView.html', data.bg);
            });
        }
    }

    function run(){
        var $contactForm = $('#contactForm'),
            $inputs = $contactForm.find('input'),
            oldBackground = $inputs.css('background'),
            oldBorderBottom = $inputs.css('border-bottom'),
            oldColor = $inputs.css('color');
        $inputs.on('keydown', function(e){
            var enterKeyCode = 13;
            if(e.keyCode == enterKeyCode){
                checkFieldAndSend($contactForm, {
                    'background': oldBackground,
                    'border-bottom': oldBorderBottom,
                    'color': oldColor
                });
            }
        });
        $contactForm.find('.submit').on('click', function(){
            checkFieldAndSend($contactForm, {
                'background': oldBackground,
                'border-bottom': oldBorderBottom,
                'color': oldColor
            });
        });
    }

   return {
       run: run
   }
});