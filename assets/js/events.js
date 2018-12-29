//*Client Side Routes and Event Handling

const 
    newsPages = ["coverSection", "worldSection", "politicSection", "entertainmentSection", "businessSection", "healthSection", "nationalSection"],
    navButtons = ["cover", "world", "politics", "entertainment", "business", "health", "national"],
    displayNews = (item, index, array) => {

        for ( let i=0; i<newsPages.length; i++ ) {
            
            let pathname = "/" + newsPages[i]
            if ( pathname === location.pathname ) {

                let newsSection = `.${newsPages[i]}`
                $(newsSection).fadeIn(0)
                
                let navBtn = `.${navButtons[i]}`
                $(navBtn).css({"backgroundColor":"#3773c1"})
                $(".coverSection").fadeOut(0)
            } 
        }
    }

displayNews()

let section

//!EVENTS

$(".logoBtn").click( function() {
    location.href = "/"
})

$(".navBtn").click( function() {
    section = $(this).attr("data-section")
    console.log(`Get ${section}\n `)

    let url = `/${section}`
    $.get(url).then((res, status) => {
        console.log("request complete")
        console.log(status)
        console.log("----------------------")
        location.href = url 
    })
})

$(".articleAction").click( function() {

    let url = $(this).attr("data-href")
    window.open(url, '_blank')
})

let displayComments = function(response) {

    $(".articleComments").html("")

    for ( let i=0; i<response.length; i++ ) {

        let div = $("<div>"),
            leftCol = $("<div>"),
            middleCol = $("<div>"),
            rightCol = $("<div>"),
            nameTag = $("<p>"),
            commentTag = $("<p>"),
            deleteBtn = $("<button>"),
            name = response[i].name,
            comment = response[i].comment
        
           nameTag.html(name)
                  .addClass("comment")
        commentTag.html(comment)
                  .addClass("comment")
         deleteBtn.addClass("deleteComment")
                  .attr("data-id", response[i]._id)
         deleteBtn.html("<i class=\"fas fa-trash-alt\"></i>")
           leftCol.addClass("col-3")
                  .append(nameTag)
         middleCol.addClass("col-7")
                  .append(commentTag)
          rightCol.addClass("col-2")
                  .append(deleteBtn)
               div.addClass("row commentRow")
                  .append(leftCol, middleCol, rightCol)

        $(".articleComments").prepend(div)
    }
    },
    commentLogic = function() {
        let trashCan = document.getElementsByClassName("deleteComment")

        for ( let i=0; i<trashCan.length; i++ ) {

            trashCan[i].addEventListener("click", function() {

                let commentID = { "_id": $(this).attr("data-id") },
                url = `/delete-comment/${$(this).attr("data-id")}`
    
                $.ajax({
                    url: url,
                    method: "DELETE",
                    data: commentID
                }).then(() => {
                    console.log("comment deleted")
                    console.log("go refresh comments")
                    console.log("----------------------")
                    let refreshURL = "/note/" + $(".modal-save").attr("data-id")
                    $.get(refreshURL).then((response) => {
                        console.log("comment request complete")
                        console.log(response)
                        console.log("----------------------")
                        
                        if ( response === "Be the first to comment.") {
                            $(".articleComments").html(response)
                        } else {
                            displayComments(response)   
                            commentLogic()
                        }
                    })
                })
            })
        }
        
    }



$(".articleComment").click( function() {

    $(".articleComments").html("")

    let id = $(this).attr("data-id"),
        url = `/note/${id}`
    $.get(url).then((response) => {
        console.log("comment request complete")
        console.log(response)
        console.log("----------------------")

        if ( response === "Be the first to comment.") {
            $(".articleComments").html(response)
        } else {
            displayComments(response)   
            commentLogic()
        }
        
    
        $(".modal-save").attr("data-id", id)
        $("#commentModal").modal("toggle")
    })
    
})

$(".modal-save").click( function() {

    let id = $(this).attr("data-id"),
        url = `/note/${id}`,
        name = $(".user-name").val().trim(),
        comment = $(".user-comment").val().trim()

    if ( ( name === "" ) || ( comment === "" ) ) {

        TweenMax.to(".modal-content", 0.08, {
            x: "+=10",
            yoyo: true,
            repeat: 5
        })
    } else {

        let request = {
            article_id: id,
            name: name,
            comment: comment
        }
    
        $(".user-name").val("")
        $(".user-comment").val("")
    
        $.post(url, request).then((response) => {
    
            console.log("comment post complete")
            console.log(response)
            console.log("----------------------")
    
            $(".articleComments").html("")
    
            $.get(url).then((response) => {
    
                console.log("comment return complete")
                console.log(response)
                console.log("----------------------")
    
                if ( response === "Be the first to comment.") {
                    $(".articleComments").html(response)
                } else {
                    displayComments(response)   
                    commentLogic()
                }
            })
        })

    }
    
    
})


