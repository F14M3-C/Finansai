import { useState, useEffect } from "react";



function DashboardHero() {

  const [transactions, setTransactions] = useState([]);


  // Form states
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("INCOME");
  const [description, setDescription] = useState("");



  const fetchTransactions = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/transactions");
      if (!response.ok) throw new Error("Nepavyko gauti duomenų");
      const { data } = await response.json();
      setTransactions(data || []);
    } catch (error) {
      console.error("Klaida gaunant operacijas iš serverio:", error);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  const handleAddSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/api/transactions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          amount: parseFloat(amount),
          type,
          description: description.trim() || null,
          accountId: 1, // Mock account id for now
        }),
      });

      if (response.ok) {
        setTitle("");
        setAmount("");
        setType("INCOME");
        setDescription("");
        setIsAddOpen(false);
        fetchTransactions();
      } else {
        const errorData = await response.json();
        alert("Klaida: " + (errorData.error || "Nepavyko išsaugoti."));
      }
    } catch (error) {
      console.error("Ryšio klaida:", error);
      alert("Nepavyko susisiekti su serveriu.");
    }
  };

  const transactionsToRender = showAll 
    ? [...transactions].reverse() 
    : [...transactions].reverse().slice(0, 5);



    return (
                  <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div>
                <h1 className="text-3xl font-black mb-1">Apžvalga</h1>
                <p className="text-base-content/60 font-medium">Realaus laiko jūsų finansų statistika</p>
              </div>
              <div className="flex flex-wrap gap-2">
                <button 
                  className="btn btn-primary px-6 rounded-xl font-bold shadow-lg shadow-primary/20" 
                  onClick={() => setIsAddOpen(true)}
                >
                  <span className="material-symbols-outlined">add</span>
                  Pridėti operaciją
                </button>
              </div>
            </div>
    );
}

export default DashboardHero;