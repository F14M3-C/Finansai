

function InsightCard(){
    return (
        <div className="card bg-orange-50 border border-orange-200">
        <div className="card-body p-6">
        <div className="flex items-center gap-3 mb-3">
        <span className="material-symbols-outlined text-primary">lightbulb</span>
        <h4 className="font-bold">Įžvalga</h4>
        </div>
        <p className="text-sm leading-relaxed text-base-content/70">
        Jūsų pajamos šį mėnesį yra <strong className="text-base-content">12% didesnės</strong> nei vidutiniškai. Rekomenduojame padidinti periodinę investicijų sumą bent <strong className="text-base-content">€100</strong>.
        </p>
        </div>
        </div>
    )
}

export default InsightCard;