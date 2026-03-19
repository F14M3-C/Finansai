

function EditTransaction(){
    return(
        <dialog class="modal" id="edit_modal">
      <div class="modal-box rounded-2xl">
        <h3 class="font-black text-xl mb-6">Redaguoti operaciją</h3>
        <div class="space-y-4">
          <div class="form-control">
            <label class="label"
              ><span class="label-text font-bold">Pavadinimas</span></label>
            <input
              class="input input-bordered rounded-xl"
              type="text"
              value="Atlyginimas (UAB Tech)"/>
          </div>
          <div class="form-control">
            <label class="label"
              ><span class="label-text font-bold">Suma</span></label>
            <div class="join">
              <span class="join-item btn btn-disabled">€</span>
              <input
                class="input input-bordered join-item w-full rounded-r-xl"
                type="number"
                value="2500"
              />
            </div>
          </div>
        </div>
        <div class="modal-action">
          <form method="dialog">
            <button class="btn btn-ghost font-bold">Atšaukti</button>
            <button class="btn btn-primary px-8 font-bold">Išsaugoti</button>
          </form>
        </div>
      </div>
    </dialog>
    )
}

export default EditTransaction;