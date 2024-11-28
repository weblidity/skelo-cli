const sidebars = {
    "First sidebar as string": [],
    "Second sidebar as object": [
        "topic-overview"
    ],
    "Sidebar 1": [],
    "Sidebar 2": [],
    "Sidebar 3": [
        "item-1",
        "item-2",
        {
            "type": "category",
            "label": "Subcategory 1",
            "items": [
                "subitem-1",
                "subitem-2"
            ]
        },
        {
            "type": "link",
            "label": "Link 1",
            "href": "/path/to/link1"
        }
    ],
    "Third sidebar as string": []
};

module.exports = sidebars;