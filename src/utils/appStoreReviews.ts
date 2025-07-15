interface AppStoreReview {
  id: number;
  title: string;
  name: string;
  content: string;
  stars: number;
}

export const fetchAppStoreReviews = async (): Promise<AppStoreReview[]> => {
  try {
    const appId = "6504114850";
    console.log("🔄 Fetching App Store reviews...");
    
    // Always use direct iTunes API (we confirmed it works with CORS)
    const url = `https://itunes.apple.com/us/rss/customerreviews/id=${appId}/sortBy=mostRecent/json`;
    console.log("📡 Making request to:", url);
    console.log("🔧 Using direct iTunes API");
    
    const response = await fetch(url);
    console.log("📊 Response status:", response.status);
    console.log("📊 Response ok:", response.ok);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    console.log("📦 Raw App Store response:", data);
    
    if (!data.feed?.entry) {
      console.log("❌ No reviews found in App Store response");
      console.log("📦 Full response structure:", JSON.stringify(data, null, 2));
      return [];
    }

    console.log("✅ Found", data.feed.entry.length, "reviews in API response");

    const reviews = data.feed.entry.map((review: any, index: number) => {
      const processed = {
        id: index + 1,
        title: review.title.label || "Review",
        name: review.author.name.label || "Anonymous",
        content: review.content.label || "",
        stars: parseInt(review["im:rating"].label) || 5
      };
      console.log(`⭐ Review ${index + 1}:`, processed);
      return processed;
    });
    
    console.log("✅ Processed App Store reviews:", reviews);
    return reviews;
  } catch (error) {
    console.error("❌ Error fetching App Store reviews:", error);
    console.error("🔍 Error details:", error.message);
    if (error.name === 'TypeError' && error.message.includes('fetch')) {
      console.error("🚫 This looks like a CORS or network error");
    }
    return [];
  }
};