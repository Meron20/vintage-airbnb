
const Footer = () => {
  return (
    <footer className="bg-charcoal text-beige opacity-60 py-12 mt-12">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">

        <div>
          <h3 className="text-xl font-bold text-gold mb-4">About Vintage</h3>
          <p className="text-sm leading-relaxed">
            Vintage is a time-travel inspired accommodation platform where every stay
            transports you into a different historical era. From the elegance of the
            Victorian age to the bold culture of the 80s, we make immersive travel
            experiences accessible to everyone.
          </p>
          <p className="text-sm leading-relaxed mt-2">
            Our mission is to connect travelers with hosts who bring history to life
            through unique homes, curated details, and unforgettable stories.
          </p>
        </div>


        <div>
          <h3 className="text-xl font-bold text-gold mb-4">Explore</h3>
          <p className="text-sm leading-relaxed">
            Browse unforgettable era-themed stays across the world. Discover vintage
            apartments, retro cabins, medieval cottages, and futuristic domes —
            each home designed to reflect a specific historical period.
          </p>
          <p className="text-sm leading-relaxed mt-2">
            Find places based on your preferred decade or theme, compare amenities,
            read detailed host descriptions, and explore photos that capture the
            essence of each era.
          </p>
        </div>

     
        <div>
          <h3 className="text-xl font-bold text-gold mb-4">Hosting on Vintage</h3>
          <p className="text-sm leading-relaxed">
            Become an Vintage host and share the story behind your home. Whether you've
            restored a historic space or designed a themed room, we make it easy to
            list your property, set pricing, manage bookings, and welcome travelers
            who appreciate authentic design.
          </p>
          <p className="text-sm leading-relaxed mt-2">
            Earn money, build connections, and be part of a global community
            celebrating history-inspired travel.
          </p>
        </div>

      </div>

      <div className="mt-8 text-center text-sm opacity-50">
        &copy; {new Date().getFullYear()} Vintage All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
