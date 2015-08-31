window.Guest = {
	initialize: function(){
		$("#guest-login").on( "click", this.guestLogin.bind(this) );
	},

	guestLogin: function(event){
		var that = this;
		event.preventDefault();

		$username = $('#username-input');
		$password = $('#password');
		$submitButton = $('#go');

		$username.val('');
		$password.val('');

		this.slowtype($username, 'GuestUser', function(){
			that.slowtype($password, 'password', function(){
				$submitButton.click();
			});
		});
	},

	slowtype: function($el, word, callback){

		var typing = setInterval(function(){
			$el.val( $el.val() + word.slice(0,1) );
			word = word.substr(1);

			if (!word){
				clearInterval(typing);
				callback();
			}
		}, 40);
	}

};
