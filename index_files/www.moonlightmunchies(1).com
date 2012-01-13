//return script here

var vMessage = 'Copying Prohibited by Law - Volusion Verified Merchant is a Trademark of Volusion, Inc.';

function vclickIE4(){
if (event.button==2){
alert(vMessage);
return false;
}
}

function vclickNS4(e){
if (document.layers||document.getElementById&&!document.all){
if (e.which==2||e.which==3){
alert(vMessage);
return false;
}
}
}

function VerifyVolusionMerchantPopup(){
            window.open('https://verify.volusion.com/verification/www.moonlightmunchies.com/verify/' + escape(document.domain.toString()),'verified','width=642,height=492,directories=no,location=no,menubar=no,resizable=no,scrollbars=0,status=no,toolbar=no');       return false;
}

var vparentDiv = document.getElementById('VolusionVerified');
if(vparentDiv)
{
    
    
    // div exists so we can do stuff
    var vlink;
    var vimageRef;
    
    vlink = document.createElement('A');
    vimageRef = document.createElement('IMG');
    vimageRef.setAttribute('oncontextmenu','alert(vMessage); return false;');
    vimageRef.setAttribute('border','0');
    
    if (document.layers){
        vimageRef.onmousedown = vclickNS4;
    }else if (document.all&&!document.getElementById){
        vimageRef.onmousedown = vclickIE4;
    };

    //vlink.target = '_blank';
    vlink.href = 'javascript:void(0);';

vlink.onclick = VerifyVolusionMerchantPopup; vimageRef.src='https://verify.volusion.com/verification/image/www.moonlightmunchies.com';   vlink.appendChild(vimageRef);
    vparentDiv.appendChild(vlink);
    
}
