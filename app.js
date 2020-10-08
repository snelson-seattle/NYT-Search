
$(document).ready(function() {  

      $("#search-btn").on("click", function(event){
        event.preventDefault();
        // Constants
        const apiKey = "1IxBE0GAZxWngiouxADHqyC0oM6sYxEU";  // NYT Article Search API Key
        const beginDate = "&begin_date="; 
        const endDate = "&end_date=";
        
        // Capture Search Criteria
        let keyword = $("#search-term").val();       
        let numArticles = parseInt($("#num-records").val());
        let startYear = $("#start-year").val();
        let endYear = $("#end-year").val();

        // Construct endpoint for ajax call
        let queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=" + apiKey + "&q=" + keyword;
        
        if(startYear != "" && endYear != ""){
            queryURL += beginDate + startYear + "0101"  // append to endpoint url
        }
        if(endYear != "" && startYear != ""){
            queryURL += endDate + endYear + "1231"; // append to endpoint url
        }
        console.log(queryURL);

        $.ajax({
            url: queryURL,
            method: "GET"
          }).then(function(response) {
            $("#results-area").empty();
            console.log(response);

            for(let i = 0; i < numArticles; i++){
              let articleDiv = $("<div>");
              let headline = $("<h3>").text(response.response.docs[i].headline.main);
              let byline = $("<h5>").text(response.response.docs[i].byline.original);             
              let dateData = response.response.docs[i].pub_date;
              dateData = dateData.slice(0, 10);
              let date = $("<h6>").text("Published: " + dateData);              
              let lead = $("<p>").text(response.response.docs[i].lead_paragraph);
              let link = $("<a>").attr("href", response.response.docs[i].web_url).text(response.response.docs[i].web_url);
              articleDiv.append(headline);
              articleDiv.append(byline);
              articleDiv.append(date);
              articleDiv.append(lead);
              articleDiv.append(link);
              $("#results-area").append(articleDiv);
            }
          });
      });

      $("#clear-btn").on("click", function() {
        $("#results-area").empty();
      });

});