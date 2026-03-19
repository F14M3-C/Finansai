import { useState } from "react"

function AddTransaction(){

    const [ title, setTitle ] = useState("")
    const [ amount, setAmount ] = useState(null)
    const [ type, setType ] = useState(null)
    const [ description, setDescription ] = useState("")

    const handleSubmit = async (e) => {

        e.preventDefault(); 
        try {
        const response = await fetch("/api/transactions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title,
            amount: parseFloat(amount),
            type,
            description: description.trim() || null,
            accountId: 1, // temp id 
          }),
        });

        if (response.ok) {
          const result = await response.json();
          console.log("Operacija sėkmingai pridėta", result);  
        } 
      } catch (error) {
        console.log(error);
        
      }
    }
    return(

    <>
    <button 
    className="btn btn-primary px-6 rounded-xl font-bold shadow-lg shadow-primary/20" 
    onClick={()=>document.getElementById('AddTransaction_modal').showModal()}>
    <span class="material-symbols-outlined">add</span>
    Pridėti operaciją
    </button>

    <dialog id="AddTransaction_modal" className="modal">

    <div className="modal-box ">
        <h3 className="font-black text-xl mb-6">Pridėti operaciją</h3>

    <form  method="dialog" onSubmit={handleSubmit} className="modal-backdrop text-black">

         <div className="space-y-4">
            <div className="form-control">
              <label className="label">
             <span className="label-text font-bold">Tipas</span>
             </label>

              <select
                name="type"
                className="select select-bordered w-full rounded-xl"
                required
                onChange={(e) => setType(e.target.value)}
                >
                <option value="INCOME">Pajamos</option>
                <option value="EXPENSE">Išlaidos</option>
              </select>

            </div>

            <div className="form-control">
              <label className="label"
                ><span className="label-text font-bold">Pavadinimas</span></label>
              <input
                name="title"
                className="input input-bordered w-full rounded-xl"
                type="text"
                placeholder="Pvz., Atlyginimas"
                required
                onChange={(e) => setTitle(e.target.value)}
                />
            </div>

            <div className="form-control">
              <label className="label"
                ><span className="label-text font-bold">Suma</span></label>
              <div className="join">
                <span className="join-item btn btn-disabled">€</span>
                <input
                  name="amount"
                  className="input input-bordered join-item w-full rounded-r-xl"
                  type="number"
                  step="0.01"
                  placeholder="0.00"
                  required
                  onChange={(e) => setAmount(e.target.value)}
                  />
              </div>
            </div>

            <div className="form-control">

              <label className="label"
                ><span className="label-text font-bold">Aprašymas</span></label>

              <textarea
                name="description"
                className="textarea textarea-bordered w-full rounded-xl"
                placeholder="Papildoma informacija (nebūtina)"
                rows="3"
                onChange={(e) => setDescription(e.target.value)}
                ></textarea>

            </div>

          </div>

    <div class="modal-action mt-6">
    <button
    type="button"
    className="btn font-bold"
    onClick={() => document.getElementById('AddTransaction_modal').close()}
    >
    Atšaukti
    </button>

    <button type="submit" class="btn btn-primary px-8 font-bold">
    Pridėti
    </button>
    </div>

    </form>
    </div>

    </dialog>
    </>
    )
}

export default AddTransaction;