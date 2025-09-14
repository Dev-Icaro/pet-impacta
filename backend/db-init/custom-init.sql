CREATE EXTENSION IF NOT EXISTS "pgcrypto";

CREATE TABLE veterinarians (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    license_number VARCHAR(50) UNIQUE NOT NULL,
    phone VARCHAR(20),
    email VARCHAR(255),
    created_at TIMESTAMP NOT NULL DEFAULT now(),
    updated_at TIMESTAMP NOT NULL DEFAULT now()
);

CREATE TABLE pets (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    species VARCHAR(100) NOT NULL,
    breed VARCHAR(100),
    age INT,
    owner_name VARCHAR(255) NOT NULL,
    owner_phone VARCHAR(20),
    owner_email VARCHAR(255),
    created_at TIMESTAMP NOT NULL DEFAULT now(),
    updated_at TIMESTAMP NOT NULL DEFAULT now()
);

CREATE TABLE services (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price NUMERIC(10,2) NOT NULL DEFAULT 0.00,
    created_at TIMESTAMP NOT NULL DEFAULT now(),
    updated_at TIMESTAMP NOT NULL DEFAULT now()
);

CREATE TABLE appointments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    pet_id UUID NOT NULL,
    service_id UUID NOT NULL,
    veterinarian_id UUID,
    appointment_date TIMESTAMP NOT NULL,
    notes TEXT,
    created_at TIMESTAMP NOT NULL DEFAULT now(),
    updated_at TIMESTAMP NOT NULL DEFAULT now(),

    CONSTRAINT fk_pet FOREIGN KEY (pet_id) REFERENCES pets (id) ON DELETE CASCADE,
    CONSTRAINT fk_service FOREIGN KEY (service_id) REFERENCES services (id) ON DELETE CASCADE,
    CONSTRAINT fk_veterinarian FOREIGN KEY (veterinarian_id) REFERENCES veterinarians (id) ON DELETE SET NULL
);
