//*Client Side Routes and Event Handling

const 
    classes = ["coverSection", "worldSection", "politicSection", "entertainmentSection", "businessSection", "healthSection", "nationalSection"],
    displayNews = (item, index, array) => {

        console.log(`item ${item}`)
        console.log(`index ${index}`)
        console.log(`array ${array}`)
        console.log(`section ${section}`)
        console.log('\n============================')

        let news = `.${item}`
        if ( section === item ) { $(news).fadeIn(0) } 
        else $(news).fadeOut(0)
    }

let section

$(".navBtn").click( function() {
    section = $(this).attr("data-section")
    console.log(`${section}\n `)
    classes.forEach(displayNews.bind(section))
})