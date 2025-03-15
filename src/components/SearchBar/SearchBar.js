import searchBarStyles from './SearchBar.module.css';

export default function SearchBar() {
    return (
        <div className={searchBarStyles.container}>

            <div className={searchBarStyles.searchAndFilterDiv}>

                <div className={searchBarStyles.searchDiv}>
                    <h3 className={searchBarStyles.header}>Search Task By Title</h3>

                    <input
                        className={searchBarStyles.input}
                        value={null}
                        type="search"
                        placeholder="Search Task Title..."
                    />
                </div>


                <div className={searchBarStyles.filterDiv}>

                    <h3 className={searchBarStyles.header}>Category</h3>

                    <div className={searchBarStyles.checkboxButtonDivContainer}>

                        <div className={searchBarStyles.checkboxButtonDiv}>
                            <h6 className={searchBarStyles.checkboxButtonText}>Personal</h6>
                            <input
                                type="checkbox"
                            />

                        </div>

                        <div className={searchBarStyles.checkboxButtonDiv}>
                            <h6 className={searchBarStyles.checkboxButtonText}>Work</h6>
                            <input
                                type="checkbox"
                            />

                        </div>

                        <div className={searchBarStyles.checkboxButtonDiv}>
                            <h6 className={searchBarStyles.checkboxButtonText}>Groceries</h6>
                            <input
                                type="checkbox"
                            />

                        </div>

                    </div>

                </div>


                <div className={searchBarStyles.filterDiv}>

                    <h3 className={searchBarStyles.header}>Status</h3>

                    <div className={searchBarStyles.checkboxButtonDivContainer}>

                        <div className={searchBarStyles.checkboxButtonDiv}>
                            <h6 className={searchBarStyles.checkboxButtonText}>All</h6>
                            <input
                                type="checkbox"
                            />

                        </div>

                        <div className={searchBarStyles.checkboxButtonDiv}>
                            <h6 className={searchBarStyles.checkboxButtonText}>Completed</h6>
                            <input
                                type="checkbox"
                            />

                        </div>

                        <div className={searchBarStyles.checkboxButtonDiv}>
                            <h6 className={searchBarStyles.checkboxButtonText}>Incomplete</h6>
                            <input
                                type="checkbox"
                            />

                        </div>

                    </div>

                </div>


                <div className={searchBarStyles.filterDiv}>

                    <h3 className={searchBarStyles.header}>Priority</h3>

                    <div className={searchBarStyles.checkboxButtonDivContainer}>

                        <div className={searchBarStyles.checkboxButtonDiv}>
                            <h6 className={searchBarStyles.checkboxButtonText}>High</h6>
                            <input
                                type="checkbox"
                            />

                        </div>

                        <div className={searchBarStyles.checkboxButtonDiv}>
                            <h6 className={searchBarStyles.checkboxButtonText}>Medium</h6>
                            <input
                                type="checkbox"
                            />

                        </div>

                        <div className={searchBarStyles.checkboxButtonDiv}>
                            <h6 className={searchBarStyles.checkboxButtonText}>Low</h6>
                            <input
                                type="checkbox"
                            />

                        </div>

                    </div>

                </div>


            </div>


        </div>
    )
}