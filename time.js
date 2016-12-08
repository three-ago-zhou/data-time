window.onload=function(){
    var year=0;
    var two=0;//闰年还是平年中的二月日期
    var countyear=0;//右点击之后，获得的年
    var clickmons=0;//点击获得的月份
    var timestamps=Date.parse(new Date())/1000;//时间戳，到秒
    var minutes=timestamps/60;//有多少分
    var hours=timestamps/(60*60);//有多少小时
    var days=timestamps/(60*60*24);//有多少天
    var years=timestamps/((60*60*24)*(31+two+31+30+31+30+31+31+30+31+30+31));
    var myDate = new Date();//当前的时间戳
    var newyear=myDate.getFullYear();//当前的月份
    function createTag(tag,attr){
        if(tag==undefined && attr==undefined){
            return false;
        }
        var tag_name=document.createElement(tag.toUpperCase());
        if(attr==null){
            return tag_name;
        }else{
            for(var i=0,len=attr.length;i<len;i++){
                for(var key in attr[i]){
                    tag_name.setAttribute(key,attr[i][key]);
                }
            }
            return tag_name;
        }
    }  
    var spans=document.createTextNode(newyear);
    var a1s=document.createTextNode('<');
    var a2s=document.createTextNode('>');
    var inp=createTag('input',[{'type':'hidden'},{'name':''},{'id':'timestamp'}]);
    var inp2=createTag('input',[{'type':'hidden'},{'name':''},{'id':'timestamp2'}]);
    var inp3=createTag('input',[{'type':'hidden'},{'name':''},{'id':'timestamp3'}]);
    var div=createTag('div',[{'class':'data_year'}]);
    var span=createTag('span',[{'class':'data_span'}]); 
    var a1=createTag('a',[{'class':'data_year_a1'},{'href':'javascript:void(0)'}]);
    var a2=createTag('a',[{'class':'data_year_a2'},{'href':'javascript:void(0)'}]);
    var ms=createTag('div',[{'class':'data_month'}]);
    // 未点击时自动渲染一遍
    function initial(){
        isLeapYear(year);
        hide();
    };
    initial();
    // 这是初始点击时自动获得的时间戳;
    document.getElementById('newdata').onclick=function(){
        year=new Date().getFullYear();
        // 当我点击的时候要清空页面数据
        countyear=parseInt(document.getElementsByClassName('data_span')[0].innerText);
        nulls();
        isLeapYear(year);
    };
    document.getElementsByClassName('submit_data')[0].onclick=function(){
        year=new Date().getFullYear();
        // 当我点击的时候要清空页面数据
        countyear=parseInt(document.getElementsByClassName('data_span')[0].innerText);
        nulls();
        isLeapYear(year);
    };
    // 判断是否闰年
    function isLeapYear(year) {
        var cond1 = year % 4 == 0;
        var cond2 = year % 100 != 0; 
        var cond3 = year % 400 ==0;
        var cond = cond1 && cond2 || cond3;
        if(cond) {
            two=29;
            return y(29);
        } else {
            two=28;
            return y(28);
        };
    };
    // 年份的渲染和布局的渲染
    function y(two){
        document.getElementById('data_content').appendChild(div);
        document.getElementsByClassName('data_year')[0].appendChild(span);
        document.getElementsByClassName('data_span')[0].appendChild(spans);
        document.getElementsByClassName('data_year')[0].appendChild(a1);
        document.getElementsByClassName('data_year_a1')[0].appendChild(a1s);
        document.getElementsByClassName('data_year')[0].appendChild(a2);
        document.getElementsByClassName('data_year_a2')[0].appendChild(a2s);
        document.getElementsByClassName('data_year')[0].appendChild(ms);
        // 月份里面的添加
        ass();
        // 
        // 
        // return console.log('返回出了渲染好的页面，进入ass()进行月份的循环');
    };
    // 月份的渲染 传入当前的月份i
    function ass(){
        var i=1;
        var getm=13;
        /*console.log('获取到了countyear:'+countyear);*/
        // 进行判断，如果点击的时间比现在时间戳小的话，就是十二月份;
        // console.log('这是指定日期的时间戳'+Date.parse(new Date(countyear+',12,31'))/1000);
        if(timestamps-(Date.parse(new Date(countyear+'/12/31'))/1000)>0){
            // console.log('当前年份比这个年份大');
        }else{
            getm=myDate.getMonth()+2;
        }
        // console.log(getm);
        //这里的i必须是变量月份，获取到当前的时间戳的年份里面的月份
        while(i<getm){
            var a=document.createElement('A');
            document.getElementsByClassName('data_month')[0].appendChild(a);
            a.setAttribute('class','mont'+i);
            // a.setAttribute('id','mont');
            a.setAttribute('href','javascript:void(0)');
            if(document.getElementById('timestamp3')!=null && document.getElementById('timestamp3').value==i){
                document.getElementsByClassName('mont'+i)[0].setAttribute('id','mont');
                document.getElementsByClassName('mont'+i)[0].style.border='1px solid #00baf8';
                document.getElementsByClassName('mont'+i)[0].style.color='#00baf8'; 
            }
            var as=document.createTextNode(i+'月');
            document.getElementsByClassName('mont'+i)[0].appendChild(as);
            
            i++;
        };
        if(i==getm){
            return show();
            // console.log('月份已经到了,返回出显示');
        }
    };
    //这里是左点击事件获得的年份的时间戳
    function prevyear(){
        var clickyear=document.getElementsByClassName('data_span')[0].innerText;
        clickyear=parseInt(clickyear)-1;
        document.getElementsByClassName('data_span')[0].innerText=clickyear;
        // console.log('左点击事件响应了'+clickyear);
        if(document.getElementsByClassName('data_month')[0].innerHTML!=''){
            nulls();
            countyear=clickyear;
            isLeapYear(clickyear);
            changeyear(clickyear);
            return ;
        };
    };
    //这里是右点击事件获得的年份的时间戳
    function nextyear(){
        if(!(timestamps-(Date.parse(new Date(countyear+'/12/31'))/1000)>0)){
            return ;
        }
        var clickyear=document.getElementsByClassName('data_span')[0].innerText;
        clickyear=parseInt(clickyear)+1;
        
        document.getElementsByClassName('data_span')[0].innerText=clickyear;
        // console.log('右点击事件响应了'+clickyear);
        if(document.getElementsByClassName('data_month')[0].innerHTML!=''){
            nulls();
            countyear=clickyear;
            isLeapYear(clickyear);
            changeyear(clickyear);
            return ;
        };
    };
    // 左点击事件
    document.getElementsByClassName('data_year_a1')[0].onclick=function(){
        // console.log('我点击了左边的事件');
        prevyear();
    };
    // 右点击事件
    document.getElementsByClassName('data_year_a2')[0].onclick=function(){
        // console.log('我点击了右边的事件');
        nextyear();
    };
    // 先是日期框，dom元素加载完之后才能显示，不然就会空白，原生太讲究树形的顺序了
    function show(){
        document.getElementById('data_content').style.display='block';
    };
    // 初始化时，页面数据加载，但是隐藏
    function hide(){
        document.getElementById('data_content').style.display='none';
    };
    // 点击月份的时候获得时间戳
    document.getElementsByClassName("data_month")[0].addEventListener('click',function(e){
        clickmons=parseInt(e.target.innerText);
        newdatas();
    });
    function newdatas(){
        document.getElementsByClassName('statement_datas')[0].appendChild(inp);
        document.getElementsByClassName('statement_datas')[0].appendChild(inp2);
        document.getElementsByClassName('statement_datas')[0].appendChild(inp3);
        hide();
        var s=0;
        if(clickmons==2){
            if(two==28){
                inp.setAttribute('value',(Date.parse(new Date(countyear+'/'+clickmons+'/28'))+86399000)/1000);
                inp2.setAttribute('value',Date.parse(new Date(countyear+'/'+clickmons+'/1'))/1000);
                s=Date.parse(new Date(countyear+'/'+clickmons+'/28'));
                
            }else if(two==29){
                inp.setAttribute('value',(Date.parse(new Date(countyear+'/'+clickmons+'/29'))+86399000)/1000);
                inp2.setAttribute('value',Date.parse(new Date(countyear+'/'+clickmons+'/1'))/1000);
                s=Date.parse(new Date(countyear+'/'+clickmons+'/29'));
            };
        }else if(clickmons==1||clickmons==3||clickmons==5||clickmons==7||clickmons==8||clickmons==10||clickmons==12){
            inp.setAttribute('value',(Date.parse(new Date(countyear+'/'+clickmons+'/31'))+86399000)/1000);
            inp2.setAttribute('value',Date.parse(new Date(countyear+'/'+clickmons+'/1'))/1000);
            s=Date.parse(new Date(countyear+'/'+clickmons+'/31'));
        }else if(clickmons==4||clickmons==6||clickmons==9||clickmons==11){
            inp.setAttribute('value',(Date.parse(new Date(countyear+'/'+clickmons+'/30'))+86399000)/1000);
            inp2.setAttribute('value',Date.parse(new Date(countyear+'/'+clickmons+'/1'))/1000);
            s=Date.parse(new Date(countyear+'/'+clickmons+'/30'));
        };
        var getf=new Date(s).getFullYear();
        var getm=new Date(s).getMonth()+1;
        inp3.setAttribute('value',new Date(s).getMonth()+1);
        document.getElementById('newdata').innerText=getf+'年'+getm+'月';
        document.getElementById('state_area').innerText=getf+'年'+getm+'月结算明细';
    };
    // 左右点击的时候判断是否在同一个年里
    function changeyear(d){
        if(d!=parseInt(document.getElementById('newdata').innerText.substring(0,4))){
            document.getElementById('mont').style.border="none";
            document.getElementById('mont').style.color="#333";
        }
    };
    //点击的时候清空页面里面的月份
    function nulls(){
        document.getElementsByClassName('data_month')[0].innerHTML='';
        // console.log('页面清空');
    };
}