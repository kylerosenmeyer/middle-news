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

$(".articleComment").click( function() {

    let id = $(this).attr("data-id"),
        url = `/note/${id}`
    $.get(url).then((response) => {
        console.log("comment request complete")
        console.log(response)
        console.log("----------------------")

        for ( let i=0; i<response.length; i++ ) {

            let div = $("<div>"),
                smallCol = $("<div>"),
                largeCol = $("<div>"),
                nameTag = $("<p>"),
                commentTag = $("<p>"),
                name = response[i].name,
                comment = response[i].comment
            
               nameTag.html(name)
            commentTag.html(comment)
              smallCol.addClass("col-3")
                      .append(nameTag)
              largeCol.addClass("col-9")
                      .append(commentTag)
                   div.addClass("row commentRow")
                      .append(smallCol, largeCol)

            $(".articleComments").prepend(div)
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

            for ( let i=0; i<response.length; i++ ) {

                let div = $("<div>"),
                    smallCol = $("<div>"),
                    largeCol = $("<div>"),
                    nameTag = $("<p>"),
                    commentTag = $("<p>"),
                    name = response[i].name,
                    comment = response[i].comment
                
                   nameTag.html(name)
                commentTag.html(comment)
                  smallCol.addClass("col-3")
                          .append(nameTag)
                  largeCol.addClass("col-9")
                          .append(commentTag)
                       div.addClass("row")
                          .append(smallCol, largeCol)
    
                $(".articleComments").prepend(div)
            }
        })
    })

})