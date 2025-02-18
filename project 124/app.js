const microphoneButton = document.getElementById('microphoneButton');

microphoneButton.addEventListener('click',function(){
    window.open(
        'http://localhost:5500/mic/index1.html',
        "",
        "width=280px,height=280px"
    );
});


