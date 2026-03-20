document.addEventListener("DOMContentLoaded", () => {
  const addTransactionForm = document.getElementById("add-transaction-form");
  const modal = document.getElementById("add_transaction_modal");
  const transactionsList = document.getElementById("transactions-list");
  
  // Susirandame "Žiūrėti visą sąrašą" mygtuką. Jūsų index.html kode jis greičiausiai toks: 
  // <button class="btn btn-ghost btn-sm text-primary font-bold">Žiūrėti visą sąrašą</button>
  // Todėl pridedame id, arba paprasčiausiai surandame pagal tekstą ar struktūrą.
  // Geriausia būtų index.html faile jam uždėti id="view-all-btn", bet kol kas rasim pagal klasę toje sekcijoje:
  const viewAllBtn = document.querySelector(".p-4.border-t.border-base-200.text-center button");

  let allTransactions = []; // Čia saugosime visus gautus įrašus
  let showAll = false;      // Būsena, ar rodome viską, ar tik 5

  // Funkcija, kuri renderina html remdamasi masyvu ir 'showAll' būsena
  function renderTransactions() {
    if (!allTransactions || allTransactions.length === 0) {
      transactionsList.innerHTML = `
        <tr>
          <td colspan="5" class="py-12 text-center text-base-content/60">
            <div class="flex flex-col items-center justify-center">
              <span class="material-symbols-outlined text-5xl mb-3 opacity-50">receipt_long</span>
              <p class="text-lg font-bold text-base-content/80">Nėra naujų operacijų</p>
              <p class="text-sm mt-1">
                Pradėkite paspaudę <button class="btn btn-link btn-sm px-1 text-primary" onclick="document.getElementById('add_transaction_modal').showModal()">Pridėti operaciją</button>
              </p>
            </div>
          </td>
        </tr>
      `;
      if (viewAllBtn) viewAllBtn.parentElement.style.display = "none";
      return;
    }

    transactionsList.innerHTML = "";
    
    // Apversime duomenis, kad naujausi būtų viršuje, ir imsime tik pirmuosius 5, jei showAll yra false
    const transactionsToRender = showAll ? [...allTransactions].reverse() : [...allTransactions].reverse().slice(0, 5);

    transactionsToRender.forEach(transaction => {
      const isIncome = transaction.type === "INCOME";
      const amountFormatted = parseFloat(transaction.amount).toFixed(2);
      
      const dateObj = new Date(transaction.createdAt);
      const dateFormatted = dateObj.toLocaleDateString("lt-LT", { month: 'long', day: '2-digit' }).replace(' m.', '');
      
      const tr = document.createElement("tr");
      tr.className = "hover group";
      
      tr.innerHTML = `
        <td>
          <div class="flex items-center gap-3">
            <div class="avatar placeholder">
              <div class="${isIncome ? 'bg-orange-100 text-primary' : 'bg-error/10 text-error'} rounded w-10">
                <span class="material-symbols-outlined text-xl">${isIncome ? 'work' : 'shopping_bag'}</span>
              </div>
            </div>
            <div>
              <div class="font-bold">${transaction.title}</div>
              <div class="text-[10px] opacity-50 font-bold uppercase">${isIncome ? 'Pajamos' : 'Išlaidos'}</div>
            </div>
          </div>
        </td>
        <td>
          <div class="badge badge-outline border-base-300 text-[10px] font-bold">
            ${transaction.description ? 'Išsami' : 'Bendra'}
          </div>
        </td>
        <td class="text-base-content/60 font-medium text-sm">
          ${dateFormatted}
        </td>
        <td class="text-right font-black ${isIncome ? 'text-emerald-600' : 'text-error'}">
          ${isIncome ? '+' : '-'}€${amountFormatted}
        </td>
        <td class="text-center">
          <div class="flex justify-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <button class="btn btn-ghost btn-xs btn-square" title="Redaguoti">
              <span class="material-symbols-outlined text-sm">edit</span>
            </button>
            <button class="btn btn-ghost btn-xs btn-square text-error" title="Ištrinti">
              <span class="material-symbols-outlined text-sm">delete</span>
            </button>
          </div>
        </td>
      `;
      transactionsList.appendChild(tr);
    });

    // Tvarkome mygtuko "Žiūrėti visą sąrašą" logiką
    if (viewAllBtn) {
      if (allTransactions.length <= 5) {
        // Jei įrašų iš viso 5 ar mažiau - mygtuko nereikia
        viewAllBtn.parentElement.style.display = "none";
      } else {
        viewAllBtn.parentElement.style.display = "block";
        viewAllBtn.innerText = showAll ? "Rodyti mažiau" : `Žiūrėti visą sąrašą (${allTransactions.length})`;
      }
    }
  }

  // Mygtuko paspaudimo įvykis
  if (viewAllBtn) {
    viewAllBtn.addEventListener("click", () => {
      showAll = !showAll; // Pakeičiame būseną (true į false, false į true)
      renderTransactions(); // Pilnai perpaišome lentelę su nauja būsena
    });
  }

  async function fetchTransactions() {
    try {
      const response = await fetch("http://localhost:3000/api/transactions");
      if (!response.ok) throw new Error("Nepavyko gauti duomenų");
      
      const { data } = await response.json();
      allTransactions = data;
      
      renderTransactions();
      
    } catch (error) {
      console.error("Klaida gaunant operacijas iš serverio:", error);
    }
  }

  fetchTransactions();

  if (addTransactionForm) {
    addTransactionForm.addEventListener("submit", async (event) => {
      event.preventDefault(); 

      const title = document.getElementById("t-title").value;
      const amount = document.getElementById("t-amount").value;
      const type = document.getElementById("t-type").value;
      const description = document.getElementById("t-description").value;

      try {
        const response = await fetch("http://localhost:3000/api/transactions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title,
            amount: parseFloat(amount),
            type,
            description: description.trim() || null,
            accountId: 1, 
          }),
        });

        if (response.ok) {
          console.log("Operacija sėkmingai pridėta", await response.json());
          addTransactionForm.reset();
          modal.close();
          fetchTransactions(); // Vėl atnaujiname, kad prisidėtų naujas įrašas ir veiktų < 5 logika
        } else {
          const errorData = await response.json();
          alert("Klaida: " + (errorData.error || "Nepavyko išsaugoti."));
        }
      } catch (error) {
        console.error("Ryšio klaida:", error);
        alert("Nepavyko susisiekti su serveriu.");
      }
    });
  }
});