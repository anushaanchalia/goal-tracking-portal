exports.refineGoal = async (req, res) => {
  try {
    const { title, description, uomType } = req.body;

    // Simulate AI processing delay (1.5 seconds)
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Mock SMART Goal generation logic
    let refinedTitle = title;
    let refinedDesc = description;

    if (title) {
      refinedTitle = `Optimize and Scale: ${title.charAt(0).toUpperCase() + title.slice(1)}`;
    }

    if (description) {
      refinedDesc = `[SMART GOAL] Specific: ${description} | Measurable: Track via ${uomType || 'metrics'} | Achievable: With current resources | Relevant: Aligns with Q-goals | Time-bound: End of quarter.`;
    }

    res.json({
      title: refinedTitle,
      description: refinedDesc
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to generate AI response" });
  }
};
