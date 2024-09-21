# 6DOSS | Six Degrees of Separation Spotify

## Overview

6DOSS is a project designed to scrape Spotify data related to collaborative music efforts. The primary aim is to study and analyze a complex network based on the concept of 'Six Degrees of Separation' from a specific artist.

## Motivation

The motivation behind this project stems from the fascination with exploring the interconnectedness of musicians and their collaborations. By leveraging Spotify data, we aim to unravel the intricate web of musical connections and investigate how artists are linked through their collaborations.

## Features

- **Data Scraping**: Utilizes Spotify APIs to gather information on collaborative tracks.
    - Directory: `src/scrapping`
- **Creating Graphs**: Generates .csv files containing information about the collected data
    - Directory: `src/data`
- **Network Analysis**: Analyzes the collected data to construct a complex network of musical collaborations.
    - Directory:  `src/notebooks`
- **Visualization**: Visualizes the network using graph visualization techniques for better understanding and interpretation.
    - Directory: `src/networks`

## Usage


### Running the Scrapping
1. Clone the repository.
2. Install dependencies using `npm install`.
3. Run database with `docker-compose up -d`
4. Configure database tables with `npm run migration:generate && npm run migration:run`
5. Obtain Spotify API credentials and set them up in the configuration file.
6. Run the scraping script using `npm run dev` to collect data from Spotify.
7. Analyze the collected data using provided scripts or implement custom analysis.
8. Visualize the network to gain insights into musical connections.

### Creating graph for network
1. You must export the data as `.csv` create the graphs using NetworkX
2. On your database, export the `artists` table as `artists.csv` and put on folder `src/data`. This will be the nodes of your graph
3. Run the SQL `src/scrapping/database/scripts/edges.sql` to get the edges information and export as `feats.csv` on folder `src/data`

## Contribution

Contributions to 6DOSS are welcome! Feel free to open issues for feature requests, bug reports, or general feedback. Pull requests are also encouraged for those willing to contribute code improvements or new features.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgements

- **Spotify**: For providing access to their API, enabling the collection of valuable data for this project.
- **Open Source Community**: For creating and maintaining libraries and tools used in this project.

## Contact

For any inquiries or discussions regarding 6DOSS, feel free to reach out to the project maintainer at [dev.julio.alves@gmail.com](mailto:dev.julio.alves@gmail.com).

---

Feel free to customize any sections or add more details specific to your project!
