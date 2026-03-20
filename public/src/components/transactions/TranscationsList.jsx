import { useEffect, useState } from "react";

function TransactionsList() {
	const [data, setData] = useState([]);

	const getData = async () => {
		try {
			const response = await fetch("/api/transactions/1", {
				method: "GET",
				headers: {
					"Content-Type": "application/json",
				},
			});

			if (!response.ok) {
				console.log("Couldn't Get Data");
			}

			const { data } = await response.json();

			setData(data);
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		const load = async () => {
			await getData();
		};
		load();
	}, []);

	return (
		<>
			{/* Transactions List */}
			<div className="lg:col-span-2 space-y-6">
				<div className="card bg-base-100 shadow-sm border border-base-300 overflow-hidden">
					<div className="p-6 border-b border-base-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
						<div>
							<h3 className="text-xl font-black">Paskutinės operacijos</h3>
							<p className="text-xs text-base-content/50 font-bold uppercase tracking-widest mt-1">
								Pajamos ir išlaidos
							</p>
						</div>
						<div className="join shadow-sm border border-base-200">
							<button className="btn btn-sm join-item bg-base-100 border-none hover:bg-base-200">
								Visi
							</button>
							<button className="btn btn-sm join-item bg-base-100 border-none hover:bg-base-200">
								Pajamos
							</button>
							<button className="btn btn-sm join-item bg-base-100 border-none hover:bg-base-200">
								Išlaidos
							</button>
						</div>
					</div>

					<div className="overflow-x-auto">
						<table className="table table-lg">
							<thead>
								<tr className="bg-base-200/50">
									<th className="text-xs font-bold uppercase text-base-content/50">
										Operacija
									</th>
									<th className="text-xs font-bold uppercase text-base-content/50">
										Kategorija
									</th>
									<th className="text-xs font-bold uppercase text-base-content/50">
										Data
									</th>
									<th className="text-xs font-bold uppercase text-base-content/50 text-right">
										Suma
									</th>
									<th className="text-xs font-bold uppercase text-base-content/50 text-center">
										Veiksmai
									</th>
								</tr>
							</thead>

							<tbody>
								{data.map((transaction) => {
									return (
										<tr className="hover group">
											<td>
												<div className="flex items-center gap-3">
													<div className="avatar placeholder">
														<div className="bg-orange-100 text-primary rounded w-10">
															<span className="material-symbols-outlined text-xl">
																work
															</span>
														</div>
													</div>
													<div>
														<div className="font-bold">{transaction.title}</div>
														<div className="text-[10px] opacity-50 font-bold uppercase">
															{transaction.type === "INCOME"
																? "Atlynigimas"
																: "Išlaidos"}
														</div>
													</div>
												</div>
											</td>
											<td>
												<div className="badge badge-outline border-base-300 text-[10px] font-bold">
													Darbas
												</div>
											</td>
											<td className="text-base-content/60 font-medium text-sm">
												Gegužės 20
											</td>
											<td
												className={`text-right font-black ${transaction.type === "INCOME" ? "text-emerald-600" : "text-red-600"}`}
											>
												{`${transaction.type === "INCOME" ? "+" : "-"}${Number(transaction.amount).toFixed(2)}€`}
											</td>
											<td className="text-center">
												<div className="flex justify-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
													<button
														className="btn btn-ghost btn-xs btn-square"
														title="Redaguoti"
													>
														<span className="material-symbols-outlined text-sm">
															edit
														</span>
													</button>
													<button
														className="btn btn-ghost btn-xs btn-square text-error"
														title="Ištrinti"
													>
														<span className="material-symbols-outlined text-sm">
															delete
														</span>
													</button>
												</div>
											</td>
										</tr>
									);
								})}
							</tbody>
						</table>
					</div>
					<div className="p-4 border-t border-base-200 text-center">
						<button className="btn btn-ghost btn-sm text-primary font-bold">
							Žiūrėti visą sąrašą
						</button>
					</div>
				</div>
			</div>
		</>
	);
}

export default TransactionsList;
