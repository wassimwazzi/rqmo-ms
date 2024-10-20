import { Node, Action } from "../gameobjects/Game";

// TODO: Merge this into data.js and delete this file

export const GameData = {
  nodes: {
    '0': new Node({
      prompt: "I’ve reviewed your results from the clinic. It’s still unclear, but let’s discuss your symptoms.",
      scene: 'SpecialistScene'
    }),
    '1_1': new Node({
      prompt: "We could do some blood work, or schedule an MRI. What do you think?",
      scene: 'SpecialistScene'
    }),
    '2_1': new Node({
      prompt: "Have you noticed any specific triggers that make your symptoms worse?",
      scene: 'SpecialistScene'
    }),
    '3_1': new Node({
      prompt: "We’ve run some tests, but they’ve come back inconclusive. What would you like to do next?",
      scene: 'SpecialistScene'
    }),
  },
  edges:
    [
      {
        from: '0',
        to: '1_1',
        action: [
          new Action({
            message: "I think it might be an autoimmune disease. Could we investigate that?",
            stressScore: 5,
            diagnosticScore: 15
          }),
          new Action({
            message: "I’m scared. I don’t understand what’s happening.",
            stressScore: 10,
            diagnosticScore: 10
          }),
          new Action({
            message: "Just give me something to stop the pain!",
            stressScore: 20,
            diagnosticScore: 5
          })
        ]
      },
      {
        from: '1_1',
        to: '2_1',
        action: new Action({
          message: "I think it might be an autoimmune disease. Could we investigate that?",
          stressScore: 5,
          diagnosticScore: 15
        })
      },
      {
        from: '0',
        to: '1_1',
        action: new Action({
          message: "I think it might be an autoimmune disease. Could we investigate that?",
          stressScore: 5,
          diagnosticScore: 15
        })
      },
      {
        from: '0',
        to: '1_1',
        action: new Action({
          message: "I think it might be an autoimmune disease. Could we investigate that?",
          stressScore: 5,
          diagnosticScore: 15
        })
      },
      {
        from: '0',
        to: '1_1',
        action: new Action({
          message: "I think it might be an autoimmune disease. Could we investigate that?",
          stressScore: 5,
          diagnosticScore: 15
        })
      },
    ]
}

export const SceneData = {
  scenes: [
    {
      sceneName: "Specialist Office",
      dialogueTree: [
        {
          specialist: "I’ve reviewed your results from the clinic. It’s still unclear, but let’s discuss your symptoms.",
          playerOptions: [
            {
              text: "I think it might be an autoimmune disease. Could we investigate that?",
              effect: { stress: "small", success: "moderate" }
            },
            {
              text: "I’m scared. I don’t understand what’s happening.",
              effect: { stress: "low", success: "small" }
            },
            {
              text: "Just give me something to stop the pain!",
              effect: { stress: "high", success: "minimal" }
            }
          ]
        },
        {
          specialist: "We could do some blood work, or schedule an MRI. What do you think?",
          playerOptions: [
            {
              text: "Let’s do the MRI. I need answers.",
              effect: { stress: "moderate", success: "high" }
            },
            {
              text: "Blood work is fine. Let’s start there.",
              effect: { stress: "minimal", success: "moderate" }
            },
            {
              text: "What do you think is the best approach?",
              effect: { stress: "low", success: "small" }
            }
          ]
        },
        // 10 More Dialogues Below
        {
          specialist: "Have you noticed any specific triggers that make your symptoms worse?",
          playerOptions: [
            {
              text: "Stress makes it worse. Could that be a factor?",
              effect: { stress: "small", success: "moderate" }
            },
            {
              text: "It feels random. One day I’m fine, the next I can barely get out of bed.",
              effect: { stress: "moderate", success: "small" }
            },
            {
              text: "I don’t know. It’s hard to keep track.",
              effect: { stress: "moderate", success: "low" }
            }
          ]
        },
        {
          specialist: "We’ve run some tests, but they’ve come back inconclusive. What would you like to do next?",
          playerOptions: [
            {
              text: "I want a second opinion from another specialist.",
              effect: { stress: "low", success: "small" }
            },
            {
              text: "Let’s rerun the tests. Maybe we missed something.",
              effect: { stress: "moderate", success: "moderate" }
            },
            {
              text: "Just prescribe me something for the pain.",
              effect: { stress: "high", success: "minimal" }
            }
          ]
        },
        {
          specialist: "We could explore some lifestyle changes. Would you be open to that?",
          playerOptions: [
            {
              text: "Yes, if it helps with the symptoms.",
              effect: { stress: "low", success: "small" }
            },
            {
              text: "I don’t think lifestyle changes will help me.",
              effect: { stress: "moderate", success: "low" }
            },
            {
              text: "Maybe, but I think the problem is deeper than that.",
              effect: { stress: "small", success: "moderate" }
            }
          ]
        },
        {
          specialist: "Your symptoms are complex. Have you experienced anything like this before?",
          playerOptions: [
            {
              text: "No, this is the first time something like this has happened.",
              effect: { stress: "low", success: "small" }
            },
            {
              text: "I’ve had occasional flare-ups, but nothing this severe.",
              effect: { stress: "moderate", success: "moderate" }
            },
            {
              text: "I’ve always had weird health issues, but doctors never find anything.",
              effect: { stress: "high", success: "small" }
            }
          ]
        },
        {
          specialist: "Do you think your symptoms could be related to something environmental?",
          playerOptions: [
            {
              text: "Possibly. I’ve moved recently, and things got worse afterward.",
              effect: { stress: "small", success: "moderate" }
            },
            {
              text: "I don’t think it’s environmental, it feels internal.",
              effect: { stress: "low", success: "small" }
            },
            {
              text: "I’m not sure. I haven’t noticed a pattern.",
              effect: { stress: "moderate", success: "minimal" }
            }
          ]
        },
        {
          specialist: "We could try a different medication to see if it alleviates your pain.",
          playerOptions: [
            {
              text: "Yes, let’s try something new.",
              effect: { stress: "low", success: "small" }
            },
            {
              text: "I’m wary of taking more medications.",
              effect: { stress: "moderate", success: "small" }
            },
            {
              text: "Medication hasn’t worked for me in the past.",
              effect: { stress: "moderate", success: "minimal" }
            }
          ]
        },
        {
          specialist: "Some patients report improvements with alternative treatments. Would you like to try any?",
          playerOptions: [
            {
              text: "I’m open to alternative treatments if they can help.",
              effect: { stress: "small", success: "moderate" }
            },
            {
              text: "I don’t believe in alternative treatments.",
              effect: { stress: "moderate", success: "minimal" }
            },
            {
              text: "Can we stick with traditional medicine for now?",
              effect: { stress: "low", success: "small" }
            }
          ]
        },
        {
          specialist: "Are there any conditions that run in your family that we should be aware of?",
          playerOptions: [
            {
              text: "Yes, autoimmune diseases run in my family.",
              effect: { stress: "small", success: "high" }
            },
            {
              text: "I’m not aware of any family history.",
              effect: { stress: "low", success: "small" }
            },
            {
              text: "I don’t know my family’s health history.",
              effect: { stress: "moderate", success: "low" }
            }
          ]
        },
        {
          specialist: "Do you think stress might be playing a role in your symptoms?",
          playerOptions: [
            {
              text: "Yes, stress definitely seems to make things worse.",
              effect: { stress: "small", success: "moderate" }
            },
            {
              text: "I don’t think stress is the cause, but it doesn’t help.",
              effect: { stress: "moderate", success: "small" }
            },
            {
              text: "No, my symptoms are present even when I’m not stressed.",
              effect: { stress: "low", success: "minimal" }
            }
          ]
        },
        {
          specialist: "Would you be willing to keep a symptom diary to help us track patterns?",
          playerOptions: [
            {
              text: "Yes, I’ll do whatever it takes to find out what’s wrong.",
              effect: { stress: "small", success: "moderate" }
            },
            {
              text: "I’m not sure if I can keep track of everything, but I’ll try.",
              effect: { stress: "moderate", success: "small" }
            },
            {
              text: "I don’t think a diary will help. The symptoms are too unpredictable.",
              effect: { stress: "high", success: "minimal" }
            }
          ]
        }
      ]
    },
    {
      sceneName: "Local Clinic",
      dialogueTree: [
        {
          specialist: "What brings you in today?",
          playerOptions: [
            {
              text: "I’ve been feeling really weak, and I don’t know why.",
              effect: { stress: "neutral", success: "low" }
            },
            {
              text: "I’m exhausted all the time, and my joints hurt. It’s getting worse.",
              effect: { stress: "small", success: "small" }
            },
            {
              text: "No one can figure out what’s wrong with me. I need help!",
              effect: { stress: "high", success: "moderate" }
            }
          ]
        },
        {
          specialist: "That could be a number of things. I’ll prescribe some painkillers. Rest and come back if it persists.",
          playerOptions: [
            {
              text: "That’s it? Can’t we run more tests?",
              effect: { stress: "small", success: "small" }
            },
            {
              text: "Painkillers won’t solve this! What’s really going on?",
              effect: { stress: "high", success: "high" }
            },
            {
              text: "I’ll just leave, then.",
              effect: { stress: "low", success: "minimal" }
            }
          ]
        }
      ]
    },
    {
      sceneName: "Community Health Center",
      dialogueTree: [
        {
          specialist: "I understand you’ve been going through a tough time. Let’s talk about your symptoms.",
          playerOptions: [
            {
              text: "It’s exhausting, physically and emotionally. Nothing is working.",
              effect: { stress: "low", success: "small" }
            },
            {
              text: "I’m frustrated. I’ve seen so many doctors.",
              effect: { stress: "moderate", success: "moderate" }
            },
            {
              text: "Do you know anyone who’s been through something like this?",
              effect: { stress: "small", success: "small" }
            }
          ]
        },
        {
          specialist: "We offer some alternative treatments here, or I can refer you to a support group. What would you like to try?",
          playerOptions: [
            {
              text: "Let’s try some alternative treatments.",
              effect: { stress: "small", success: "small" }
            },
            {
              text: "I’d rather talk to others who are going through the same thing.",
              effect: { stress: "small", success: "moderate" }
            },
            {
              text: "Neither, I just need more tests.",
              effect: { stress: "moderate", success: "small" }
            }
          ]
        }
      ]
    },
    {
      sceneName: "Emergency Room",
      dialogueTree: [
        {
          specialist: "We need to move fast. Tell me what’s been happening.",
          playerOptions: [
            {
              text: "It’s all happening so fast… I don’t know.",
              effect: { stress: "high", success: "low" }
            },
            {
              text: "I think it might be an autoimmune condition. My specialist wasn’t sure.",
              effect: { stress: "moderate", success: "high" }
            },
            {
              text: "I’ve had unexplained fever and joint pain for weeks. This isn’t just an emergency!",
              effect: { stress: "high", success: "high" }
            }
          ]
        },
        {
          specialist: "We need to run tests. What do you suggest? Blood work or imaging?",
          playerOptions: [
            {
              text: "Imaging is faster. Let’s do that.",
              effect: { stress: "high", success: "moderate" }
            },
            {
              text: "Start with blood work. It’s what they’ve done before.",
              effect: { stress: "low", success: "small" }
            },
            {
              text: "I don’t know, just do something!",
              effect: { stress: "high", success: "low" }
            }
          ]
        }
      ]
    }
  ]
};
