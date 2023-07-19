import {useEffect, useState} from "react";
import Loading from "./Loading.jsx";
import Tours from "./Tours.jsx";

const url = 'https://course-api.com/react-tours-project';

const App = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [tours, setTours] = useState([]);
    const [refresh, setRefresh] = useState(false);

    const removeTour = (id) => {
        const newTours = tours.filter((tour) => tour.id !== id)
        setTours(newTours)
    }

    useEffect(() => {
        setIsLoading(true);

        fetch(url)
            .then(resp => resp.json())
            .then(tours => setTours(tours))
            .catch(error => console.log(error));

        setIsLoading(false);
    }, [refresh])

    if (isLoading) {
        return (
            <main>
                <Loading/>
            </main>
        )
    }

    if (tours.length === 0) {
        return (
            <main>
                <div className="title">
                    <h2>no tours left</h2>
                    <button
                        type='button'
                        style={{marginTop:'2rem'}}
                        className='btn'
                        onClick={() => setRefresh(true)}>
                        refresh
                    </button>
                </div>
            </main>
        )
    }

    return (
        <main>
            <Tours tours={tours} removeTour={removeTour}/>
        </main>
    );
};
export default App;
