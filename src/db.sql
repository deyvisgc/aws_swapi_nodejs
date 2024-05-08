CREATE TABLE characters (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    height VARCHAR(255),
    mass VARCHAR(255),
    hair_color VARCHAR(255),
    skin_color VARCHAR(255),
    eye_color VARCHAR(255),
    birth_year VARCHAR(255),
    gender VARCHAR(255),
    homeworld VARCHAR(255),
    created DATETIME,
    edited DATETIME,
    url VARCHAR(255)
);

CREATE TABLE films (
    id INT AUTO_INCREMENT PRIMARY KEY,
    character_id INT,
    film_url VARCHAR(255),
    FOREIGN KEY (character_id) REFERENCES characters(id)
);

CREATE TABLE vehicles (
    id INT AUTO_INCREMENT PRIMARY KEY,
    character_id INT,
    vehicle_url VARCHAR(255),
    FOREIGN KEY (character_id) REFERENCES characters(id)
);

CREATE TABLE starships (
    id INT AUTO_INCREMENT PRIMARY KEY,
    character_id INT,
    starship_url VARCHAR(255),
    FOREIGN KEY (character_id) REFERENCES characters(id)
);

CREATE TABLE species (
    id INT AUTO_INCREMENT PRIMARY KEY,
    character_id INT,
    species_url VARCHAR(255),
    FOREIGN KEY (character_id) REFERENCES characters(id)
);