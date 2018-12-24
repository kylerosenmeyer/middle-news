//*Client Side Routes and Event Handling

const 
    newsPages = ["coverSection", "worldSection", "politicSection", "entertainmentSection", "businessSection", "healthSection", "nationalSection"],
    displayNews = (item, index, array) => {

        for ( let i=0; i<newsPages.length; i++ ) {
            
            let pathname = "/" + newsPages[i]
            if ( pathname === location.pathname ) {

                let newsSection = `.${newsPages[i]}`
                $(newsSection).fadeIn(0)
                $(".coverSection").fadeOut(0)
            }
        }
    }

displayNews()

let section

//!EVENTS

$(".mainTitle").click( function() {
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