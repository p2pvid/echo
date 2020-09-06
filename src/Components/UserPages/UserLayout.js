import Navigation from './UserNavigation';
// import Footer from './Footer';
// import Modal from './ContactModal'

export default function Layout({ children }) {
	return (
		<div className="">
			<Navigation />

			<main className="mt-5 pt-3 nav-clearnace mb-5">{children}</main>

			{/* <Footer /> */}
			{/* <Modal /> */}
		</div>
	);
}
