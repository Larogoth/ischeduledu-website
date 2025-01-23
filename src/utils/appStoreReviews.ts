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
    const response = await fetch(
      `https://itunes.apple.com/us/rss/customerreviews/id=${appId}/sortBy=mostRecent/json`
    );
    const data = await response.json();
    
    if (!data.feed?.entry) {
      console.log("No reviews found");
      return [];
    }

    return data.feed.entry.map((review: any, index: number) => ({
      id: index + 1,
      title: review.title.label || "Review",
      name: review.author.name.label || "Anonymous",
      content: review.content.label || "",
      stars: parseInt(review["im:rating"].label) || 5
    }));
  } catch (error) {
    console.error("Error fetching App Store reviews:", error);
    return [];
  }
};