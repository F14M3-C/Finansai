import AddTransaction from "./transactions/AddTransaction";




function DashboardHero(){

    return(
            <>  
        <div
            class="flex flex-col md:flex-row md:items-end justify-between gap-6"
            >
            <div>
              <h1 class="text-3xl font-black mb-1">Apžvalga</h1>
              <p class="text-base-content/60 font-medium">
                Realaus laiko jūsų finansų statistika
              </p>
            </div>
            <div class="flex flex-wrap gap-2">
                <AddTransaction />
            </div>
          </div>

                </>
 )   
}

export default DashboardHero;