/**
 * Created by Administrator on 2017/6/8 0008.
 */
$(function () {

    $.ajax({
        // url: "http://127.0.0.1:5000/api/province",
        url: "http://192.168.31.247:5000/api/province",
        crossDomain: true,
        type: "get",
        // data: JSON.stringify({user_name: "test1", password: "123456"}),
        contentType: "application/json",
        dataType: "json",
        beforeSend:function () {

            $("#loadingToast").removeAttr("style")
         

        },
        success: function(data) {
            $('#loadingToast').hide();
            $.each(data.data,function (index,elem) {
                $("#province").append("<option id='"+elem.id+"' value='"+data.data[index].name+"' >"+data.data[index].name+"</option>");
                // alert(elem.title)
            });

        },
        error: function(err) {
            console.log(err)
        }
    })
    $("#year").change(function () {
        $(this).prev().html( $("#year").find("option:checked").text());
        // $(this).prev().html( $(this).val());
    })
    $("#Semester").change(function () {
        $(this).prev().html( $("#Semester").find("option:checked").text());
        // $(this).prev().html( $(this).val());
    })
    $("#province").change(function () {
        $(this).prev().html( $(this).val());
        $("#city").val('').prev().html( '请选择');
        $("#county").val('').prev().html( '请选择');
        $("#school").val('').prev().html( '请选择');
        for(var i=1; i< $("#city")[0].options.length; ){
            $("#city")[0].removeChild(   $("#city")[0].options[i]);
        }
        proption = $("#province")[0].options[$("#province")[0].selectedIndex];
       // alert($("#province").find("option:checked").attr("id"))
        $.ajax({
            // url: "http://127.0.0.1:5000/api/city",
            url: "http://192.168.31.247:5000/api/city",
            crossDomain: true,
            type: "get",
            data: {"pro_id":proption.id },
            contentType: "application/json",
            dataType: "json",
            beforeSend:function () {
                $("#loadingToast").removeAttr("style")
            },
            success: function(data) {
                $('#loadingToast').hide();
                $.each(data.data,function (index,elem) {
                    $("#city").append("<option id='"+elem.id+"' value='"+data.data[index].name+"' >"+data.data[index].name+"</option>");
                    // alert(elem.title)
                });

            },
            error: function(err) {
                console.log(err)
            }
        })
    });

    $("#city").focus(function () {
        if(typeof(proption)=="undefined")
        {
            alert("请先选择省份")
            $("#city").blur()
        }
    }).change(function () {
        $(this).prev().html( $(this).val());
        $("#county").val('').prev().html( '请选择');
        $("#school").val('').prev().html( '请选择');
        for(var i=1; i< $("#county")[0].options.length; ){
            $("#county")[0].removeChild( $("#county")[0].options[i]);
        }
        cioption = $("#city")[0].options[$("#city")[0].selectedIndex];
        $.ajax({
            // url: "http://127.0.0.1:5000/api/area",
            url: "http://192.168.31.247:5000/api/area",
            crossDomain: true,
            type: "get",
            data: {"city_id":cioption.id },
            contentType: "application/json",
            dataType: "json",
            beforeSend:function () {
                $("#loadingToast").removeAttr("style")
            },
            success: function(data) {
                $('#loadingToast').hide();
                console.log(data)
                $.each(data.data,function (index,elem) {
                    $("#county").append("<option id='"+elem.id+"' value='"+data.data[index].name+"' >"+data.data[index].name+"</option>");
                    // alert(elem.title)
                });
            },
            error: function(err) {
                console.log(err)
            }
        })
    });

    $("#county").focus(function () {
        if(typeof(cioption)=="undefined")
        {
            alert("请先选择城市")
            $("#county").blur()
        }

    }).change(function () {
        $(this).prev().html( $(this).val());
        $("#school").val('').prev().html( '请选择');
        option = $("#county")[0].options[$("#county")[0].selectedIndex];
        for(var i=1; i< $("#school")[0].options.length; ){
            $("#school")[0].removeChild( $("#school")[0].options[i]);
        }

        $.ajax({
            async:false,
            // url: "http://127.0.0.1:5000/api/school",
            url: "http://192.168.31.247:5000/api/school",
            crossDomain: true,
            type: "get",
            data: {"ctid":option.id },
            contentType: "application/json",
            dataType: "json",
            beforeSend:function () {
                $('#loadingToast').show();
            },
            success: function(data) {
                $('#loadingToast').hide();
                Schoolnum=data.data.length;
                if(data.data.length!=0){
                    $.each(data.data,function (index,elem) {
                        $("#school").append("<option id='"+elem.id+"' value='"+data.data[index].name+"' >"+data.data[index].name+"</option>");
                        // alert(elem.title)
                    });
                }
                else{
                    alert("暂无该区域学校信息")
                    $("#school").blur()
                }
            },
            error: function(err) {
                console.log(err)
            }

        })
    })
    $("#school").focus(function () {
        if(typeof(cioption)=="undefined")
        {
            alert("请先选择区域")
            $("#school").blur()
        }
         if(Schoolnum==0)
        {
            alert("暂无该区域学校信息")
            $("#school").blur()
        }
    }).change(function () {
        $(this).prev().html( $(this).val())
        schoolid = $("#school")[0].options[$("#school")[0].selectedIndex];
    });
    GRADE = {
        '1': '一年级',
        '2': '二年级',
        '3': '三年级',
        '4': '四年级',
        '5': '五年级',
        '6': '六年级',
        '7': '初一',
        '8': '初二',
        '9': '初三',
        '10': '高一',
        '11': '高二',
        '12': '高三'
    }
    $("#schoolclass").change(function () {
        $(this).prev().html( $(this).val());
    })
    $("#grade").change(function () {
        
        $(this).prev().html( $("#grade").find("option:checked").text());
        // $(this).prev().html( $(this).val());
    })
    $("#subject").change(function () {
        $(this).prev().html( $("#subject").find("option:checked").text());
    })
    $("#stage").change(function () {
        $(this).prev().html( $("#stage").find("option:checked").text());
        // $(this).prev().html( $(this).val());
    })
    // $("#date").datetimePicker({title:"选择日期",m:1});
    // $("#date").click(function () {
    //    alert($("#date").val())
    //     console.log($("#date").val())
    // });
    // laydate({
    //     elem: '#date',
    //     choose: function(dates){ //选择好日期的回调
    //         $("#date").prev().html( $("#date").val());
    //     }
    // })

    $("#date").datetimePicker({title:"选择日期",m:1}).change(function () {
        $(this).prev().html($("#date").val() );
        // $(this).prev().html( $(this).val());
    });

})