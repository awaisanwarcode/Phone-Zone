import "./companies.css";
export const CompaniesComp = () => {
    return (
        <>
            <div className="comapniesSec" id="Companies">
                <h2>Companies For You , We Serve</h2>
                <div className="companiesCont">
                    <a href="#Iphone" className="sngl-cmpni">
                        <img src="http://localhost:4000/pr0ducts/iphone-logo-bg-brown.png" alt="companyLogo" />
                    </a>
                    <a href="#Vivo" className="sngl-cmpni">
                        <img src="http://localhost:4000/pr0ducts/vivo-logo-bg-brown.png" alt="companyLogo" />
                    </a>
                    <a href="#Samsung" className="sngl-cmpni samsung">
                        <img src="http://localhost:4000/pr0ducts/samsung-logo.png" alt="companyLogo" />
                    </a>
                    <a href="#Oppo" className="sngl-cmpni">
                        <img src="http://localhost:4000/pr0ducts/oppo-logo-bg-black.png" alt="companyLogo" />
                    </a>
                    <a href="#Infinix" className="sngl-cmpni">
                        <img src="http://localhost:4000/pr0ducts/infinix-logo-bg-black.png" alt="companyLogo" />
                    </a>
                </div>
            </div>
        </>
    )
}