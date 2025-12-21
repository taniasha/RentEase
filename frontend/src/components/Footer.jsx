export default function Footer(){
    return(
        <>
           <footer class="bg-dark text-light pt-4 pb-2 mt-5">
                <div class="container">
                    <div class="row">

                    {/* <!-- Logo + About --> */}
                    <div class="col-md-4 mb-3">
                        <h5 class="fw-bold">RentEase</h5>
                        <p class="small">
                        Your easy, smart, and reliable rental management partner.
                        </p>
                    </div>

                    {/* <!-- Quick Links --> */}
                    <div class="col-md-4 mb-3">
                        <h6 class="fw-bold">Quick Links</h6>
                        <ul class="list-unstyled small">
                        <li><a href="#" class="text-light text-decoration-none">Home</a></li>
                        <li><a href="#" class="text-light text-decoration-none">About</a></li>
                        <li><a href="#" class="text-light text-decoration-none">Services</a></li>
                        <li><a href="#" class="text-light text-decoration-none">Contact</a></li>
                        </ul>
                    </div>

                    {/* <!-- Contact --> */}
                    <div class="col-md-4 mb-3">
                        <h6 class="fw-bold">Contact</h6>
                        <p class="small mb-1"><i class="bi bi-geo-alt"></i> Chandigarh, India</p>
                        <p class="small mb-1"><i class="bi bi-envelope"></i> support@rentease.com</p>
                        <p class="small"><i class="bi bi-telephone"></i> +91 98765 43210</p>
                    </div>

                    </div>

                    <hr class="border-light" />

                    <div class="text-center small">
                    © 2025 RentEase — All Rights Reserved.
                    </div>
                </div>
           </footer>

        </>
    );
}