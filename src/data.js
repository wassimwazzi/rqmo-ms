export const GAME_DATA = {
    "nodes": {
        "0": {
            "prompt": "I’ve reviewed your results from the clinic. It’s still unclear, but let’s discuss your symptoms.",
            "scene": "SpecialistScene"
        },
        "1_1": {
            "prompt": "We could do some blood work, or schedule an MRI. What do you think?",
            "scene": "SpecialistScene"
        },
        "2_1": {
            "prompt": "Have you noticed any specific triggers that make your symptoms worse?",
            "scene": "SpecialistScene"
        },
        "3_1": {
            "prompt": "We’ve run some tests, but they’ve come back inconclusive. What would you like to do next?",
            "scene": "SpecialistScene"
        }
    },
    "edges": {
        "0": [
            {
                "to": "1_1",
                "actions": [
                    {
                        "message": "I think it might be an autoimmune disease. Could we investigate that?",
                        "stressScore": 5,
                        "diagnosticScore": 15
                    },
                    {
                        "message": "I’m scared. I don’t understand what’s happening.",
                        "stressScore": 10,
                        "diagnosticScore": 10
                    },
                    {
                        "message": "Just give me something to stop the pain!",
                        "stressScore": 20,
                        "diagnosticScore": 5
                    }
                ]
            }
        ],
        "1_1": [
            {
                "to": "2_1",
                "actions": [
                    {
                        "message": "Let’s do the MRI. I need answers.",
                        "stressScore": 15,
                        "diagnosticScore": 20
                    },
                    {
                        "message": "Blood work is fine. Let’s start there.",
                        "stressScore": 7,
                        "diagnosticScore": 10
                    },
                    {
                        "message": "What do you think is the best approach?",
                        "stressScore": 5,
                        "diagnosticScore": 5
                    }
                ]
            }
        ],
        "2_1": [
            {
                "to": "3_1",
                "actions": [
                    {
                        "message": "Stress makes it worse. Could that be a factor?",
                        "stressScore": 5,
                        "diagnosticScore": 12
                    },
                    {
                        "message": "It feels random. One day I’m fine, the next I can barely get out of bed.",
                        "stressScore": 10,
                        "diagnosticScore": 5
                    },
                    {
                        "message": "I don’t know. It’s hard to keep track.",
                        "stressScore": 10,
                        "diagnosticScore": 5
                    }
                ]
            }
        ]
    }
}