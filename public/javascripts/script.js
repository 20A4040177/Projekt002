const validateForm=()=>
{
    if (!document.getElementById('txtName').value)
    {
        document.getElementById('warning').innerHTML="Please check the phone number";
        document.getElementById('btnSearchInfo').focus();
        return false;
    }
    else return true;
}
const cbChecked = ()=>
{
    if(document.getElementById('cbMyPhone').checked==true)
    {
        document.getElementById('txtPhone').readOnly=true;
        document.getElementById('txtPhone').value=document.getElementById('txtMyPhone').value;
        document.getElementById('txtName').value=document.getElementById('txtMyName').value;
        document.getElementById('btnSearchInfo').disabled=true;

    }
    else
    {
        document.getElementById('txtPhone').readOnly=false;
        document.getElementById('txtPhone').value="";
        document.getElementById('txtName').value=""
        document.getElementById('btnSearchInfo').disabled=false;
    }
}
const fillFRM = (i)=>
{
    const table = document.getElementById("tblContactFull");
    const tr = table.getElementsByTagName("tr");
    document.getElementById('txtPhone').value=tr[i].cells[1].innerHTML;
    document.getElementById('txtName').value=tr[i].cells[2].innerHTML;
    document.getElementById('cbMyPhone').checked=false;
    document.getElementById('btnSearchInfo').disabled=false;
    document.getElementById('txtPhone').readOnly=false;
}
const resettxtName = ()=>
{
    document.getElementById('txtName').value="";
    
}
const searchContact=()=> 
{
    var input, filter, table, tr, td, i,j, txtValue;
    input = document.getElementById("txtSearch");
    filter = input.value.toUpperCase();
    table = document.getElementById("tblContact");
    tr = table.getElementsByTagName("tr");
    for (i = 1; i < tr.length; i++) 
    {
            td = tr[i];
            if (td) {
                txtValue = td.textContent || td.innerText;
                if (txtValue.toUpperCase().indexOf(filter) > -1) {
                    document.getElementById("tblContactFull").style.display = "";
                    document.getElementById("tblContact").style.display = "none";
                  tr[i].style.display = "";
                } else {
                  tr[i].style.display = "none";
                }
              }
        
     
    }
}
const isNumber=(evt)=> {
    evt = (evt) ? evt : window.event;
    var charCode = (evt.which) ? evt.which : evt.keyCode;
    if (charCode < 48 || charCode > 57) {
        return false;
    }
    return true;
}
const checkBalance=()=>{
    if(document.getElementById('cbPoint').checked==true)
    {
        if(parseInt(document.getElementById('txtPoints').value)<parseInt(document.getElementById('slbBalance').value))
            {
                document.getElementById('txtAvailPoints').value=document.getElementById('txtPoints').value;
            }
        else document.getElementById('txtAvailPoints').value=document.getElementById('slbBalance').value;
    }
    else document.getElementById('txtAvailPoints').value=0;
    
    var total = parseInt(document.getElementById('slbBalance').value)-parseInt(document.getElementById('txtAvailPoints').value);
    document.getElementById('txtTotal').value=total;
    document.getElementById('txtCashback').value=document.getElementById('slbBalance').value*2/100;
    if(parseInt(document.getElementById('txtTotal').value)>parseInt(document.getElementById('hdnBalance').value))
    {
        document.getElementById('btnNext').disabled=true;
        document.getElementById('warning').innerHTML="Insufficient funds";
    }
    else 
    {
        document.getElementById('btnNext').disabled=false;
        document.getElementById('warning').innerHTML="";
    }
    

}

