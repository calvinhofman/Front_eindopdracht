$(document).ready(function () {
    toonLijst();
    // update_AanpasForm();
    $("#aanpas-close").on('click', () => {
        $('#pasaanModal').modal('hide');
        removeChildren({parentId:'#members-add',childName:'lemember'});
    });

    $("#maak-close").on('click', () => {
        $('#modalToevoeg').modal('hide');
    });

    $("#verwijder-close").on('click', () => {
        $('#verwijderModal').modal('hide');
    });

    $("#aanpasForm").submit((e) => {
        e.preventDefault();
        console.log($('#aanpasForm').serialize());

            var data = $('#aanpasForm').serialize();
            $.ajax({
                url: "lid_aanpas.php",
                cache: false,
                method: "POST",
                data : {
                    data
                }
            })
            .done((data) => {
                if (data == "OK") {
                    $("#pasaanModal").modal('hide');
                    removeChildren({parentId:'#members-add',childName:'lemember'});
                    updateLijst();
                    
                    // $("#aanpasForm").modal('hide');
                } else {
                    alert("Er ging iets fout!");
                }
            });
    });

    $("#maakForm").submit((e) => {
        e.preventDefault();
        console.log($('#maakForm').serialize());

            var data = $('#maakForm').serialize();
            $.ajax({
                url: "lid_toevoeg.php",
                cache: false,
                method: "POST",
                data : {
                    data
                }
            })
            .done((data) => {
                if (data == "OK") {
                    $("#modalToevoeg").modal('hide');
                    updateLijst();
                    
                    // $("#aanpasForm").modal('hide');
                } else {
                    alert("Er ging iets fout!");
                }
            });
    });
    
    $("#verwijderForm").submit((e) => {
        e.preventDefault();
        console.log($('#verwijderForm').serialize());

            var data = $('#verwijderForm').serialize();
            $.ajax({
                url: "lid_verwijder.php",
                cache: false,
                method: "POST",
                data : {
                    data
                }
            })
            .done((data) => {
                if (data == "OK") {
                    $("#verwijderModal").modal('hide');
                    updateLijst();
                    
                    // $("#aanpasForm").modal('hide');
                } else {
                    alert("Er ging iets fout!");
                }
            });
    });
});

function toonLijst() {
    $.ajax({
        type: "GET",
        url: "uitlees.php",
        dataType: "JSON"
    }).done(function (data) {
            var output = "<tr>";
            // var td = "<td>";
            for (var i in data) {
                output;
                // output += '<td scope="col">' + data[i].id + '</td>';
                output += '<td>' + data[i].band_name + '</td>';
                output += '<td>' + data[i].total_members + '</td>';
                // output += '<td>' + data[i].members + '</td>';
                output += '<td>' + data[i].genre + '</td>';
                output += '<td>' + data[i].start_date + '</td>';
                output += '<td>' + data[i].active + '</td>';
                output += '<td><button type="button" class="btn btn-primary" data-id="' + data[i].id + '" data-active="' + data[i].active + '" data-band_name="' + data[i].band_name + '" data-genre="' + data[i].genre + '" data-start_date="' + data[i].start_date + '" data-total_members="' + data[i].total_members + '" data-members="' + data[i].members + '" data-toggle="modal" data-target="#pasaanModal" id="pasaanKnop">Pasaan</button></td>';
                output += '<td><button type="button" class="btn btn-danger" data-id="' + data[i].id + '" data-active="' + data[i].active + '" data-band_name="' + data[i].band_name + '" data-genre="' + data[i].genre + '" data-start_date="' + data[i].start_date + '" data-total_members="' + data[i].total_members + '" data-members="' + data[i].members + '" data-toggle="modal" data-target="#verwijderModal" id="verwijderKnop">Verwijder</button></td>';
                output += "</tr>"
            }
            // output;
            $("#hierinfo").html(output).fadeIn().delay(2000);
            // $("#hierinfo").html(td).fadeIn().delay(2000);
        });
}

function updateLijst() {
    $("#hierinfo").fadeOut(800, () => {
        $.ajax({
            type: "GET",
            url: "uitlees.php",
            dataType: "JSON"
            }).done(function (data) {
                var output = "<tr>";
                for (var i in data) {
                    output;
                    // output += '<td scope="col">' + data[i].id + '</td>';
                    output += '<td>' + data[i].band_name + '</td>';
                    output += '<td>' + data[i].total_members + '</td>';
                    output += '<td>' + data[i].genre + '</td>';
                    output += '<td>' + data[i].start_date + '</td>';
                    output += '<td>' + data[i].active + '</td>';
                    output += '<td><button type="button" class="btn btn-primary" data-id="' + data[i].id + '" data-active="' + data[i].active + '" data-band_name="' + data[i].band_name + '" data-genre="' + data[i].genre + '" data-start_date="' + data[i].start_date + '" data-total_members="' + data[i].total_members + '" data-members="' + data[i].members + '" data-toggle="modal" data-target="#pasaanModal" id="pasaanKnop">Pasaan</button></td>';
                    output += '<td><button type="button" class="btn btn-danger" data-id="' + data[i].id + '" data-active="' + data[i].active + '" data-band_name="' + data[i].band_name + '" data-genre="' + data[i].genre + '" data-start_date="' + data[i].start_date + '" data-total_members="' + data[i].total_members + '" data-members="' + data[i].members + '" data-toggle="modal" data-target="#verwijderModal" id="verwijderKnop">Verwijder</button></td>';
                    output += "</tr>"
                }
                $("#hierinfo").html(output).fadeIn().delay(2000);
        });
    });
}

$(document).on('click', '#pasaanKnop', function () {
    
    // Lees alle variabelen uit
    var id = $(this).data('id');
    var active = $(this).data('active');
    var band_name = $(this).data('band_name');
    var members = $(this).data('members');
    var total_members = $(this).data('total_members');
    var genre = $(this).data('genre');
    var start_date = $(this).data('start_date');
    var memberList = $(this).data('members').split(", ");
    // logged alle variabelen
    console.log($(this).data());
    console.log("id = " + id);
    console.log("band_name = " + band_name);
    console.log("members = " + members);
    console.log("total_members = " + total_members);
    console.log("genre = " + genre);
    console.log("start_date = " + start_date);
    console.log("active = " + active);

    //Hier komt de rest van de aanpasfunctie
    $("#aanpasInfo").html("ID = " + id);
    $("#aanpasForm #id").val(id);

    // Checked welk geslacht de persoon is
    if (active == "M") {
        $("#aanpasForm #Active_Y").prop('checked',true);
    } else {
        $("#aanpasForm #Active_N").prop('checked',true);
    }
      // Voert alle variabelen in de form 
      $("#aanpasForm #band_name").val(band_name);
    //   $("#aanpasForm #members-add").val(memberList);
      $("#aanpasForm #genre").val(genre);
      $("#aanpasForm #start_date").val(start_date);
  
    for (var member_count = 0; member_count < total_members; member_count++) {
        var member_input = document.createElement("INPUT");
        member_input.setAttribute("type", "text");
        if (memberList != '' && memberList.length > 0) {
            member_input.setAttribute("value",  memberList[member_count]);
        } else {
            member_input.setAttribute("value", "");
        }
       
        member_input.setAttribute("name", "lemember[]");
        member_input.setAttribute("class", "form-control");
        member_input.setAttribute("id", "lemember");
        document.getElementById("members-add").appendChild(member_input);
}
    // console.log("members = " + memberList[3]);
    // $("#aanpasOpslaan").attr("data-id", id);
    // $("#aanpasOpslaan").attr("data-gender", gender);
    // $("#aanpasOpslaan").attr("data-first_name", first_name);
    // $("#aanpasOpslaan").attr("data-last_name", last_name);
    // $("#aanpasOpslaan").attr("data-birth_date", birth_date);
    // $("#aanpasOpslaan").attr("data-member_since", member_since);
});

$(document).on('click', '#verwijderKnop', function () {
    // Lees alle variabelen uit
    var id = $(this).data('id');
    var band_name = $(this).data('band_name');
    var members = $(this).data('members');
    var genre = $(this).data('genre');

    // logged alle variabelen
    console.log($(this).data());
    console.log("id = " + id);
    console.log("band_name = " + band_name);
    console.log("members = " + members);
    console.log("genre = " + genre);

    //Hier komt de rest van de aanpasfunctie
    $("#verwijderInfo").html("ID = " + id);
    $("#verwijderForm #id").val(id);

    // Voert alle variabelen in de form 
    $("#verwijderForm #name").html(band_name + " " + members + " " + genre);
    $("#verwijderForm #member_since").html(member_since);
    
});

function removeChildren (params){
    var parentId = params.parentId;
    var childName = params.childName;

    var childNodesToRemove = $(parentId  + ' [id="' + childName + '"]');
    for(var i=childNodesToRemove.length-1;i >= 0;i--){
        var childNode = childNodesToRemove[i];
        childNode.parentNode.removeChild(childNode);
    }
}


function update_AanpasForm() {
    if ($("#aanpasForm #gender_m").prop('checked', true)){
        $("#aanpasOpslaan").attr("data-gender", "M");
        console.log('M');
    } else {
        $("#aanpasOpslaan").attr("data-gender", "F");
        console.log('F');
    }
    
    $("#aanpasForm #first_name").change(function () {
        console.log('typen');
        $("#aanpasOpslaan").attr("data-first_name", $("#aanpasForm #first_name").val());
    });
    
    $("#aanpasForm #last_name").change(function () {
        console.log('typen');
        $("#aanpasOpslaan").attr("data-last_name", $("#aanpasForm #last_name").val());
    });
    
    $("#aanpasForm #birth_date").change(function () {
        console.log('typen');
        $("#aanpasOpslaan").attr("data-birth_date", $("#aanpasForm #birth_date").val());
    });
    
    $("#aanpasForm #member_since").change(function () {
        console.log('typen');
        $("#aanpasOpslaan").attr("data-member_since", $("#aanpasForm #member_since").val());
    });
};