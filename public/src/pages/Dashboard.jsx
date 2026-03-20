import CoreMetricsGrid from "../components/CoreMetricsGrid";
import Header from "../components/Header";
import MobileNavbar from "../components/MobileNavbar";
import RightSidebar from "../components/RightSidebar";
import SideBar from "../components/SideBar";
import Footer from "../components/Footer";
import DashboardHero from "../components/DashboardHero";
import TransactionsList from "../components/transactions/TranscationsList";

function Dashboard() {

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
    <div className="bg-base-200 text-base-content min-h-screen">
      <div className="drawer lg:drawer-open">
        <input className="drawer-toggle" id="my-drawer-2" type="checkbox" />

        {/* Main Content */}
        <div className="drawer-content flex flex-col">
          {/* Mobile Navbar */}
          <MobileNavbar />

          {/* Top Header */}
            <Header />

          <main className="p-6 lg:p-10 max-w-7xl mx-auto w-full space-y-8">
            
            {/* Dashboard Hero */}
            <DashboardHero />

              {/* Core Metrics Grid */}
              <CoreMetricsGrid />

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

              {/* Transactions List */}
              <TransactionsList />
              
              {/* Right Sidebar: Categories & Insight */}
              <RightSidebar />

            </div>
          </main>
        
        <Footer />
        </div>
        {/* Navigation Drawer (Sidebar) */}
        <SideBar />

      </div>

      {/* Add Transaction Modal */}
      {isAddOpen && (
        <dialog className="modal modal-open">
          <div className="modal-box rounded-2xl">
            <h3 className="font-black text-xl mb-6">Pridėti operaciją</h3>
            <form onSubmit={handleAddSubmit}>
              <div className="space-y-4">
                <div className="form-control">
                  <label className="label"><span className="label-text font-bold">Tipas</span></label>
                  <select 
                    className="select select-bordered w-full rounded-xl" 
                    value={type} 
                    onChange={(e) => setType(e.target.value)}
                    required
                  >
                    <option value="INCOME">Pajamos</option>
                    <option value="EXPENSE">Išlaidos</option>
                  </select>
                </div>
                <div className="form-control">
                  <label className="label"><span className="label-text font-bold">Pavadinimas</span></label>
                  <input
                    className="input input-bordered w-full rounded-xl"
                    type="text"
                    placeholder="Pvz., Atlyginimas"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                  />
                </div>
                <div className="form-control">
                  <label className="label"><span className="label-text font-bold">Suma</span></label>
                  <div className="join">
                    <span className="join-item btn btn-disabled">€</span>
                    <input
                      className="input input-bordered join-item w-full rounded-r-xl"
                      type="number"
                      step="0.01"
                      placeholder="0.00"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <div className="form-control">
                  <label className="label"><span className="label-text font-bold">Aprašymas</span></label>
                  <textarea
                    className="textarea textarea-bordered w-full rounded-xl"
                    placeholder="Papildoma informacija (nebūtina)"
                    rows="3"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  ></textarea>
                </div>
              </div>
              <div className="modal-action mt-6">
                <button type="button" className="btn btn-ghost font-bold" onClick={() => setIsAddOpen(false)}>Atšaukti</button>
                <button type="submit" className="btn btn-primary px-8 font-bold">Pridėti</button>
              </div>
            </form>
          </div>
          <form method="dialog" className="modal-backdrop">
            <button onClick={() => setIsAddOpen(false)}>close</button>
          </form>
        </dialog>
      )}
    </div>
  );
}


export default Dashboard;