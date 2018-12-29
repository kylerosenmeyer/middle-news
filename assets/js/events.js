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

//Check to see which page is loaded and display the corresponding section.
displayNews()

let section

//!EVENTS
//*Clicking the main logo loads the root page
$(".logoBtn").click( function() {
    location.href = "/"
})

//*Clicking a news section will load that section's news.
$(".navBtn").click( function() {
    section = $(this).attr("data-section")
    // console.log(`Get ${section}\n `)

    //!ROUTE: Get News
    let url = `/${section}`
    $.get(url).then((res, status) => {
        // console.log("request complete")
        // console.log(status)
        // console.log("----------------------")
        location.href = url 
    })
})

//*Clicking the read button will load the full article in a new tab.
$(".articleAction").click( function() {

    let url = $(this).attr("data-href")
    window.open(url, '_blank')
})

// Create functions for displaying comments and adding logic to the "delete comment" buttons. The run each time we want to refresh the comments.
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
                
                //!ROUTE: Delete a comment.
                $.ajax({
                    url: url,
                    method: "DELETE",
                    data: commentID
                }).then(() => {
                    // console.log("comment deleted")
                    // console.log("go refresh comments")
                    // console.log("----------------------")
                    let refreshURL = "/note/" + $(".modal-save").attr("data-id")

                    //!ROUTE: Refresh comments after deleting one.
                    $.get(refreshURL).then((response) => {
                        // console.log("comment request complete")
                        // console.log(response)
                        // console.log("----------------------")
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


//*Clicking the comment button opens the comment section modal.
$(".articleComment").click( function() {

    $(".articleComments").html("")

    let id = $(this).attr("data-id"),
        url = `/note/${id}`

    //!ROUTE: Get the comments for this article.
    $.get(url).then((response) => {
        // console.log("comment request complete")
        // console.log(response)
        // console.log("----------------------")
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

//*Clicking the save button in the comments section will add the comment to the comments section for everyone to see.
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
        
        //!ROUTE: Submit the comment.
        $.post(url, request).then((response) => {
    
            // console.log("comment post complete")
            // console.log(response)
            // console.log("----------------------")
    
            $(".articleComments").html("")
            
            //!ROUTE: Refresh the comments after submitting one.
            $.get(url).then((response) => {
    
                // console.log("comment return complete")
                // console.log(response)
                // console.log("----------------------")
    
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


