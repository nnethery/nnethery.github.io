// Visualization data for Allie's 2025 Goodreads Wrapped
const wrappedData = {
    summary: {
        total_books: 75,
        total_pages: 27546,
        average_rating: 3.66,
        five_star_count: 7,
        top_author: "Elena Ferrante",
        top_author_count: 4,
        top_genre: "Fiction",
        top_genre_count: 51,
        reading_days: 74,
        longest_gap: 13,
        days_per_book: 4.7,
        pages_per_day: 78
    },

    ratingDistribution: {
        ratings: [1, 3, 4, 5],
        counts: [3, 8, 11, 7],
        colors: ["#e74c3c", "#f39c12", "#27ae60", "#2ecc71"]
    },

    monthlyBreakdown: {
        months: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
        counts: [6, 3, 4, 10, 6, 6, 4, 7, 10, 4, 9, 6]
    },

    genres: [
        { name: "Historical Fiction", count: 32, percentage: 42.7 },
        { name: "Fantasy", count: 25, percentage: 33.3 },
        { name: "Romance", count: 23, percentage: 30.7 },
        { name: "Historical", count: 19, percentage: 25.3 },
        { name: "Nonfiction", count: 17, percentage: 22.7 },
        { name: "Fae", count: 14, percentage: 18.7 },
        { name: "Contemporary", count: 11, percentage: 14.7 },
        { name: "Classics", count: 10, percentage: 13.3 },
        { name: "Mystery", count: 10, percentage: 13.3 },
        { name: "Memoir", count: 9, percentage: 12.0 }
    ],

    genreRatings: [
        { name: "Nonfiction", rating: 4.75, count: 4 },
        { name: "Memoir", rating: 4.67, count: 3 },
        { name: "Classics", rating: 4.33, count: 3 },
        { name: "Historical", rating: 3.78, count: 9 },
        { name: "Fantasy", rating: 3.54, count: 13 },
        { name: "Romance", rating: 3.17, count: 12 },
        { name: "Romantasy", rating: 3.0, count: 4 }
    ],

    fiveStarBooks: [
        { title: "100 Rules for Living to 100", author: "Dick Van Dyke", communityAvg: 4.41, diff: 0.59 },
        { title: "Ordinary Grace", author: "William Kent Krueger", communityAvg: 4.27, diff: 0.73 },
        { title: "The Shattered King", author: "Charlie N. Holmberg", communityAvg: 4.39, diff: 0.61 },
        { title: "The King Must Die", author: "Mary Renault", communityAvg: 3.97, diff: 1.03 },
        { title: "We Will Be Jaguars", author: "Nemonte Nenquimo", communityAvg: 4.49, diff: 0.51 },
        { title: "The Story of a New Name", author: "Elena Ferrante", communityAvg: 4.46, diff: 0.54 },
        { title: "Everything Is Tuberculosis", author: "John Green", communityAvg: 4.37, diff: 0.63 }
    ],

    oneStarBooks: [
        { title: "Onyx Storm", author: "Rebecca Yarros", community: 4.21, ratings: "1.5M", diff: -3.21 },
        { title: "One Golden Summer", author: "Carley Fortune", community: 4.30, diff: -3.30 },
        { title: "Very Cold People", author: "Sarah Manguso", community: 3.38, diff: -2.38 }
    ],

    reviews: {
        weWillBeJaguars: "Nemonte, many stars, you are a fierce jaguar warrior. It was an honor and a privilege to hear your story. Stories are living beings, as the Waorani people believe.",
        ordinaryGrace: "The dead are never far from us. They're in our hearts and on our minds and in the end all that separates us from them is a single breath, one final puff of air.",
        shatteredKing: "What a lovely read! The romance felt well-earned, more emotionally based than carnal (hear that ACOTAR?) and realistic. You don't need a love triangle to evoke sweetness and sorrow.",
        tuberculosis: "A compelling read and a stark reminder of the injustice and inequality all too prevalent in this world. Ultimately, we are the cause. We must also be the cure.",
        ferrante: "One does not simply read a Ferrante book, one lives it.",
        onyxStorm: "Felt like a lot of running around with quippy, cringy dialogue and 🌽 scenes with little to no actual plot... this should have just been a trilogy.",
        veryColdPeople: "The sad part is that there were moments of really beautiful writing or evocative imagery. I am instead left bereft.",
        kingMustDie: "A reader who wants to be transported, not validated. She'd rather wrestle with alien values than be reassured by familiar ones.",
        peaceCorps: "Who was really helping who here? Who was being changed? Humanity at the end of the day, is all about connections. About truly seeing each other."
    },

    series: [
        { name: "Neapolitan Novels", author: "Elena Ferrante", books: 4, rating: 4.5, complete: true },
        { name: "Kingdoms of Thorn and Bone", author: "Greg Keyes", books: 4, rating: 3.0, complete: true },
        { name: "The Will Darling Adventures", author: "K.J. Charles", books: 3, rating: null, complete: true }
    ],

    timeline: {
        oldest: { title: "Heart of Darkness", year: 1899, author: "Joseph Conrad" },
        newest: { title: "We Did Ok, Kid", year: 2025, author: "Anthony Hopkins" },
        spanYears: 126
    },

    eraRatings: {
        recent: { label: "0-5 years", rating: 3.17, count: 6 },
        midRecent: { label: "5-10 years", rating: 3.50, count: 2 },
        older: { label: "10-20 years", rating: 4.00, count: 8 },
        vintage: { label: "50-100 years", rating: 4.50, count: 2 }
    },

    hiddenGems: {
        mostObscure: { title: "Demons in the Golden Empire", ratings: 22, author: "Marcos Antonio Hernandez" },
        mostMainstream: { title: "Onyx Storm", ratings: "1,579,607" },
        percentUnder10k: 35,
        gems: [
            { title: "An Indian Among los Indígenas", ratings: 247, rating: 4 },
            { title: "100 Rules for Living to 100", ratings: 637, rating: 5 },
            { title: "The Home-Maker", ratings: 1930, rating: 4 },
            { title: "A Far Better Thing", ratings: 1741, rating: 4 }
        ]
    },

    bookLengths: {
        shortest: { title: "The Old Man Who Read Love Stories", pages: 144 },
        longest: { title: "Alchemised", pages: 1030 },
        average: 367,
        median: 352,
        breakdown: {
            short: 12,    // <250 pages
            medium: 40,   // 250-399
            long: 19,     // 400-599
            epic: 4       // 600+
        }
    },

    ratingStats: {
        avgDifference: -0.42,
        ratedHigher: 10,
        ratedLower: 18,
        percentHarsher: 62,
        biggestDivergence: { title: "One Golden Summer", gap: 3.30 },
        mostGenerous: { title: "The King Must Die", gap: 1.03 }
    },

    readingPatterns: {
        busiestMonth: { month: "April", count: 10 },
        slowestMonth: { month: "February", count: 3 },
        readingDays: 74,
        longestGap: { days: 13, between: "July 24 - August 6" },
        doubleBookDays: ["September 24"]
    },

    themes: [
        "Romance & Chemistry quality",
        "Dialogue authenticity",
        "Emotional resonance",
        "Character development",
        "Earned sentiment"
    ]
};
