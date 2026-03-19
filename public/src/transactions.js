document.addEventListener("DOMContentLoaded", () => {
  const addTransactionForm = document.getElementById("add-transaction-form");
  const modal = document.getElementById("add_transaction_modal");

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
            accountId: 1, // temp id 
          }),
        });

        if (response.ok) {
          const result = await response.json();
          console.log("Operacija sėkmingai pridėta", result);
          
          addTransactionForm.reset();
          modal.close();
          
          
        } else {
          const errorData = await response.json();
          alert("Klaida: " + (errorData.error || "Nepavyko išsaugoti."));
        }
      } catch (error) {
        console.error("Ryšio klaida:", error);
        alert("Nepavyko susisiekti su serveriu. Įsitikinkite, kad backend veikia port 3000.");
      }
    });
  }
});