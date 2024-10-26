// ChatGPT data. Need to refine and ensure it's coherent
export const GAME_DATA = {
    "nodes": {
        "0": {
            "prompt": "Hello, how can I help you today?",
            "scene": "SpecialistScene"
        },
        "1_1": {
            "prompt": "We could do some blood work, or schedule an MRI. What do you think?",
            "scene": "SpecialistScene"
        },
        "1_2": {
            "prompt": "Have you noticed any specific triggers that make your symptoms worse?",
            "scene": "SpecialistScene"
        },
        "1_3": {
            "prompt": "Could you provide more information?",
            "scene": "SpecialistScene"
        },
        "1_4": {
            "prompt": "What brings you here today?",
            "scene": "DoctorOfficeScene"
        },
        "2_1": {
            "prompt": "Your blood work came back inconclusive. Let's discuss your next steps.",
            "scene": "TestResultsScene"
        },
        "2_2": {
            "prompt": "The MRI shows some abnormal activity. We might need to explore further.",
            "scene": "TestResultsScene"
        },
        "2_3": {
            "prompt": "Hmm, those symptoms could indicate a number of conditions. We might need to do further tests.",
            "scene": "SpecialistScene"
        },
        "3_1": {
            "prompt": "We’ll need a spinal tap to check for central nervous system issues. Are you okay with that?",
            "scene": "SpecialistScene"
        },
        "3_2": {
            "prompt": "We could try medication to manage symptoms while we run more tests.",
            "scene": "SpecialistScene"
        },
        "3_3": {
            "prompt": "Based on your symptoms, we're looking at a few possibilities, such as Neurocalcinosis or Electrotwitch Syndrome.",
            "scene": "DiagnosisScene"
        },
        "3_4": {
            "prompt": "Let’s schedule a nerve biopsy to rule out certain conditions.",
            "scene": "SpecialistScene"
        }
    },
    "edges": {
        // key is fromNode
        "0": [
            // all the actions in this list will be the options that show up in the chat
            {
                "to": "1_1",
                "actions": [
                    {
                        "message": "I’m experiencing extreme fatigue and muscle weakness.",
                        "stressScore": 8,
                        "diagnosticScore": 10
                    },
                    {
                        "message": "I have constant dizziness and occasional fainting.",
                        "stressScore": 12,
                        "diagnosticScore": 15
                    },
                    {
                        "message": "It feels like my hands are burning.",
                        "stressScore": 15,
                        "diagnosticScore": 20
                    }
                ]
            },
            {
                "to": "1_2",
                "actions": [
                    {
                        "message": "I notice the pain worsens in colder environments.",
                        "stressScore": 10,
                        "diagnosticScore": 12
                    },
                    {
                        "message": "The migraines seem to get worse after intense exercise.",
                        "stressScore": 8,
                        "diagnosticScore": 15
                    },
                    {
                        "message": "Stress makes everything worse, especially the chest tightness.",
                        "stressScore": 12,
                        "diagnosticScore": 10
                    }
                ]
            },
            {
                "to": "1_3",
                "actions": [
                    {
                        "message": "I’m scared. I don’t understand what’s happening.",
                        "stressScore": 10,
                        "diagnosticScore": 0
                    },
                    {
                        "message": "Just give me something to stop the pain!",
                        "stressScore": 20,
                        "diagnosticScore": 5
                    },
                    {
                        "message": "I feel numbness in my legs and arms. It's getting worse.",
                        "stressScore": 15,
                        "diagnosticScore": 15
                    }
                ]
            },
            {
                "to": "1_4",
                "actions": [
                    {
                        "message": "I want to see another doctor!",
                        "stressScore": 50,
                        "diagnosticScore": 10
                    },
                ]
            },
        ],
        "1_1": [
            {
                "to": "2_1",
                "actions": [
                    {
                        "message": "Let’s start with blood work, that sounds best.",
                        "stressScore": 5,
                        "diagnosticScore": 10
                    },
                    {
                        "message": "I’m really anxious, but I’ll go with the MRI.",
                        "stressScore": 15,
                        "diagnosticScore": 20
                    }
                ]
            },
            {
                "to": "2_2",
                "actions": [
                    {
                        "message": "I think the MRI is better for my symptoms.",
                        "stressScore": 10,
                        "diagnosticScore": 20
                    },
                    {
                        "message": "I’m not sure about an MRI, it feels too intense.",
                        "stressScore": 8,
                        "diagnosticScore": 10
                    }
                ]
            }
        ],
        "1_2": [
            {
                "to": "2_3",
                "actions": [
                    {
                        "message": "No clear triggers, it just happens out of nowhere.",
                        "stressScore": 12,
                        "diagnosticScore": 5
                    },
                    {
                        "message": "Certain foods, especially gluten, seem to make it worse.",
                        "stressScore": 8,
                        "diagnosticScore": 15
                    },
                    {
                        "message": "My symptoms worsen when I don't sleep well.",
                        "stressScore": 10,
                        "diagnosticScore": 10
                    }
                ]
            }
        ],
        "2_1": [
            {
                "to": "3_1",
                "actions": [
                    {
                        "message": "What could the spinal tap show? I’m really nervous about this.",
                        "stressScore": 15,
                        "diagnosticScore": 20
                    },
                    {
                        "message": "I don’t want to do that, can we try something else first?",
                        "stressScore": 10,
                        "diagnosticScore": 10
                    }
                ]
            },
            {
                "to": "3_2",
                "actions": [
                    {
                        "message": "Let’s try medication while we run more tests.",
                        "stressScore": 5,
                        "diagnosticScore": 10
                    }
                ]
            }
        ],
        "2_2": [
            {
                "to": "3_3",
                "actions": [
                    {
                        "message": "What diseases are you thinking of?",
                        "stressScore": 12,
                        "diagnosticScore": 15
                    },
                    {
                        "message": "Neurocalcinosis? That sounds serious, tell me more.",
                        "stressScore": 18,
                        "diagnosticScore": 20
                    }
                ]
            },
            {
                "to": "3_4",
                "actions": [
                    {
                        "message": "Nerve biopsy sounds like a lot. What does that involve?",
                        "stressScore": 10,
                        "diagnosticScore": 15
                    },
                    {
                        "message": "If it can help with the diagnosis, let’s do the biopsy.",
                        "stressScore": 12,
                        "diagnosticScore": 20
                    }
                ]
            }
        ]
    },
    "diseases": [
        {
            "name": "Neurocalcinosis",
            "symptoms": [
                { "symptom": "Calcium buildup in the brain", "unique": true },
                { "symptom": "Severe migraines", "common": true },
                { "symptom": "Uncontrollable muscle spasms", "common": true },
                { "symptom": "Cognitive decline", "unique": true }
            ],
            "transmission": "Non-transmissible, caused by genetic mutation or metabolic disorder",
            "treatment": "Symptom management through medication, potential surgery for calcium removal"
        },
        {
            "name": "Electrotwitch Syndrome",
            "symptoms": [
                { "symptom": "Sudden electric shock sensations", "unique": true },
                { "symptom": "Tremors and muscle twitches", "common": true },
                { "symptom": "Numbness in extremities", "common": true },
                { "symptom": "Disorientation", "common": true }
            ],
            "transmission": "Unknown, potentially linked to electromagnetic interference",
            "treatment": "Symptom relief via neural stabilizers, avoiding electromagnetic exposure"
        },
        {
            "name": "Frozen Vein Disorder",
            "symptoms": [
                { "symptom": "Veins become rigid and cold to the touch", "unique": true },
                { "symptom": "Chronic cold extremities", "common": true },
                { "symptom": "Severe joint pain", "common": true },
                { "symptom": "Blood circulation problems", "unique": true }
            ],
            "transmission": "Non-transmissible, possibly linked to autoimmune conditions",
            "treatment": "Anti-inflammatory drugs, thermal therapy"
        }
    ]
}
