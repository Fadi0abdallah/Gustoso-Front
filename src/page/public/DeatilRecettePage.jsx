import { useParams } from "react-router-dom"
import CreateReview from "../../component/public/CreateReview"
import DeatilRecette from "../../component/public/DeatilRecette"
import Footer from "../../component/public/Footer"
import Header from "../../component/public/Header"
import ReviewsRecettes from "../../component/public/ReviewsRecettes"

const DeatilRecettePage = () => {
    const { id } = useParams();
    return (
        <>
            <Header />
            <DeatilRecette />
            <CreateReview recetteId={id} />
            <ReviewsRecettes />
            <Footer />
        </>

    )
}
export default DeatilRecettePage