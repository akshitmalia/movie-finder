
    async function searching(){
        const movie=document.getElementById("input_id").value.trim();
        if(!movie) return ;
        try{
        const result=await axios(`https://www.omdbapi.com/?apikey=aa67372e&s=${movie}`);
        const moviedata=result.data.Search;
        const display=document.getElementById("show_grid");
        display.innerHTML=moviedata.map(x=>
`
<div class="col-sm-12 col-md-6 col-lg-4">
    <div class="card  border border-dark ">
  <img src="${x.Poster}" class="card-img-top" alt="...">
  <div class="card-body">
    <h5 class="card-title">${x.Title}</h5>
    <p class="card-text">${x.Year}</p>
    <button onclick="showing('${x.imdbID}')" href="#" class="btn btn-dark">Details</button>

        </div>
        </div>
        </div>

        `
        ).join("");
        }
        catch(e){
          document.getElementById("show_grid").innerHTML=`
          <p>${e}</p>
            `
        }
    }

    async function showing(id){
        document.getElementById("show_grid").classList.add("hidden");
        try{
        const result=await axios(`https://www.omdbapi.com/?apikey=aa67372e&s&i=${id}`)
        const detail=document.getElementById("hidden_details");
        const details=result.data;
        detail.innerHTML=`
        <div class="col-lg-6 col-sm-12 col-md-12">
        <div class="card border border-dark ">
               <img src="${details.Poster}" class="card-img-top " alt="...">
  <div class="card-body">
    <h5 class="card-title">${details.Title}</h5>
    <p class="card-text"><strong>Released: </strong>${details.Released}</p>
       <p class="card-text"><strong>Runtime: </strong>${details.Runtime}</p>
          <p class="card-text"><strong>Genre: </strong>${details.Genre}</p>
             <p class="card-text"><strong>Director: </strong>${details.Director}</p>
                <p class="card-text"><strong>Actor: </strong>${details.Actors}</p>
                   <p class="card-text"><strong>Plot: </strong>${details.Plot}</p>
                      <p class="card-text"><strong>imdbRating: </strong>${details.imdbRating}</p>
        <a onclick="goback()" class="btn btn-primary d-flex justify-content-center">Back</a>


        </div>
        </div>  
        </div>      
        `
        document.getElementById("hidden_details").classList.remove("hidden");
        }
        catch(e){
        const detail=document.getElementById("hidden_details");     
        detail.innerHTML=`
        <p>${e}</p>
        `
               document.getElementById("hidden_details").classList.remove("hidden");
        }


    }
    function goback(){
        document.getElementById("hidden_details").classList.add("hidden");
        const shown=document.getElementById("hidden_details")
        shown.innerHTML = "";
        document.getElementById("show_grid").classList.remove("hidden");
    }
    document.getElementById("input_id").addEventListener("keypress",(e)=>{
        if(e.key==='Enter'){
            searching();
        }
    });
