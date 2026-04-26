import react from "react"

export default function footer() {

    return (

        <footer className="footer">
            {/* Footer top section with two columns */}
            <div className="footer-top">
        
                {/* First footer section with company info */}
                <div className="footer-section">
                    <h3>INVITY Events Listing</h3>
                    <p>
                        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptatum, suscipit autem assumenda voluptatem excepturi delectus sapiente a aspernatur cupiditate fuga quam doloribus! Nemo amet recusandae magni dolores, sed facilis quas!
                    </p>
                </div>

                {/* Second footer section with contact details */}
                <div className="footer-section">
                <h3>Contact Us</h3>
                <address>
                    <p>Griffith College</p>
                    <p>Dublin City, D08 12345</p>
                    <p>Email: info@gmail.ie</p>
                    <p>Phone: (123) 456-7890</p>
                </address>
                </div>
            </div>

            {/* Footer bottom section with copyright notice */}
            <div className="footer-bottom">
                &copy; {new Date().getFullYear()}INVITY Events Listings. All rights reserved.
            </div>
        </footer>

    );
}