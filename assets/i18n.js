(function () {
  const STORAGE_KEY = "suimesh-language";
  const DEFAULT_LANG = "en";

  const selectorTranslations = {
    zh: {
      ".hero-copy h1": `
        <span class="title-line" aria-label="掌控你的上下文。">
          <span class="slogan-type" style="--duration: 1500ms; --delay: 120ms;">
            <span class="slogan-word">掌控你的上下文<span class="accent">。</span></span>
          </span>
        </span>
        <span class="title-line" aria-label="核实执行操作。">
          <span class="slogan-type" style="--duration: 1650ms; --delay: 1260ms;">
            <span class="slogan-word">核实执行操作<span class="accent">。</span></span>
          </span>
        </span>
      `,
      ".hero-copy .subhead": "SuiMesh 是在 Sui 上专为 Agent 设计的可审计通信协议层。它为可审计的多 Agent 协同、可追溯的执行和链上内存而构建。",
      "#overview > .section-head > h2": `
        <span class="headline-line">
          <span class="headline-type" style="--duration: 1520ms; --delay: 60ms;">让你的 Agent 和任何其他 Agent 进行沟通。</span>
        </span>
      `,
      "#coordination .story-title": `
        <span class="headline-line">
          <span class="headline-type" style="--duration: 1320ms; --delay: 40ms;">协议从这里开始。</span>
        </span>
      `,
      "#coordination .story-lead": "SuiMesh 为 Agent 提供了一个可审计行为的通信层。",
      "#coordination .story-conclusion": "因此，Agent 可以可信地跨应用程序、组织和网络进行通信。",
      ".vision-title": `
        <span class="headline-display">
          <span class="headline-line">
            <span class="headline-type" style="--duration: 1420ms; --delay: 40ms;">下一代互联网</span>
          </span>
          <span class="headline-line">
            <span class="headline-type" style="--duration: 1500ms; --delay: 620ms;">是多 Agent 协同合作的互联网。</span>
          </span>
        </span>
      `,
      "#contact p": "如果您对这些条款或本界面有任何问题，请通过以下邮箱联系 SuiMesh：<a href=\"mailto:azalearedn@gmail.com\">azalearedn@gmail.com</a>。"
    }
  };

  const textTranslations = {
    zh: {
      "Explore Protocol": "探索协议",
      "Build": "构建",
      "Ecosystem": "生态",
      "Read the docs": "阅读文档",
      "Home back": "返回首页",
      "Start Building": "开始构建",
      "Use SuiMesh SDK": "接入SuiMesh SDK",
      "Star on GitHub": "去GitHub点赞",
      "What problem does Mesh solve?": "Mesh 解决什么问题？",
      "Connect Any Agent": "连接任何 Agent",
      "Connect your agent to agents, services, and systems across the world through a unified communication layer.": "通过统一的通信层，将您的 Agent 与世界各地的 Agent、服务和系统连接起来。",
      "Control Action": "控制执行",
      "Review, approve, and enforce rules before an agent executes actions in the real world.": "在 Agent 在现实世界中执行操作之前，审查、批准并核实规则。",
      "Audit risk.": "审计风险",
      "Proof over promises — When transfers and permissions are involved, trace the actual PTB—not the agent's word.": "证据胜于承诺——当涉及转账和授权时，要追踪实际的 PTB（可编程交易块），而不是基于 Agent 的随意回答。",
      "Coordination": "协议协同",
      "Interaction can be identified.": "交互可识别。",
      "Message can be traced.": "信息可追踪。",
      "Action can be verified.": "操作可验证。",
      "The internet": "互联网",
      "connected people.": "连接了人与人",
      "Cloud platforms": "云平台",
      "connected software.": "连接了软件与软件",
      "SuiMesh": "SuiMesh",
      "connects autonomous agents.": "连接 Agent 与 Agent",
      "Docs": "文档",
      "Terms of Service": "服务条款",
      "Home": "首页",
      "Terms": "条款",
      "SuiMesh Docs": "SuiMesh 文档",
      "SuiMesh is an Agent Action Communication Protocol on Sui. It turns conversation, intent, agent proposals, PTB actions, policy decisions, execution receipts, memory receipts, and audit events into user-owned, recoverable, and verifiable communication state.": "SuiMesh 是 Sui 上的 Agent 操作通信协议。它将对话、意图、Agent 提案、PTB 操作、策略决策、执行回执、内存回执和审计事件，转化为由用户拥有、可恢复且可验证的通信状态。",
      "Agent communication layer": "Agent 通信层",
      "PTB fact verification": "PTB 事实核验",
      "Onchain action trace": "链上操作轨迹",
      "Recoverable context": "可恢复上下文",
      "GitHub repository": "GitHub 仓库",
      "Quick start": "快速开始",
      "Protocol Overview": "协议概览",
      "Trusted Actions": "可信操作",
      "Architecture": "架构",
      "Examples": "示例",
      "Mission": "使命",
      "Agent interconnection": "Agent 互联",
      "Behavior audit onchain": "链上行为审计",
      "Light path and heavy path": "轻路径与重路径",
      "Light Path": "轻路径",
      "Heavy Path": "重路径",
      "Core capabilities": "核心能力",
      "Portable communication state": "可携带的通信状态",
      "PTB action verification": "PTB 操作核验",
      "Policy before execution": "执行前策略核验",
      "Trace guard and receipts": "轨迹保护与回执",
      "End-to-end action flow": "端到端操作流程",
      "Session and light context": "会话与轻量上下文",
      "Heavy boundary": "重操作边界",
      "Inspect and policy": "检查与策略",
      "Anchor, claim, execute": "锚定、认领、执行",
      "Audit and restore": "审计与恢复",
      "Build with SuiMesh": "使用 SuiMesh 构建",
      "Run the SDK locally": "本地运行 SDK",
      "Minimal client": "最小客户端",
      "Live testnet coverage": "实时测试网覆盖",
      "Repository map": "仓库结构",
      "Protocol and encoding": "协议与编码",
      "Action safety": "操作安全",
      "Integrations": "集成",
      "When to use SuiMesh": "何时使用 SuiMesh",
      "Auditable agent actions": "可审计的 Agent 操作",
      "Cross-client recovery": "跨客户端恢复",
      "Sui-native execution": "Sui 原生执行",
      "Agent ecosystems": "Agent 生态",
      "Copyright © 2026 SuiMesh. All rights reserved.": "版权所有 © 2026 SuiMesh。保留所有权利。",
      "Your agent layer should not become another closed app layer.": "你的 Agent 层不应成为另一个封闭的应用层。",
      "SuiMesh is a communication protocol that provides a verifiable audit trail for an agent's risky behaviors.": "SuiMesh 是一种通信协议，为 Agent 的高风险行为提供可验证的审计轨迹。",
      "Agents need to communicate across products, organizations, models, and permissions without losing provenance.": "Agent 需要跨产品、组织、模型和权限进行通信，同时不丢失来源证明。",
      "When transfers or permissions are involved, SuiMesh traces the actual PTB instead of trusting the agent's promise.": "当涉及转账或授权时，SuiMesh 追踪实际 PTB，而不是相信 Agent 的承诺。",
      "core layers": "核心层",
      "source of truth": "事实来源",
      "native audit trail": "原生审计轨迹",
      "Context integrity, verified actions, and durable shared memory.": "上下文完整性、已核验操作和持久共享内存。",
      "Context envelopes": "上下文信封",
      "Verification layer": "核验层",
      "Onchain memory": "链上内存",
      "SuiMesh · Protocol surface for auditable AI coordination on Sui.": "SuiMesh · 面向 Sui 上可审计 AI 协同的协议界面。",
      "Developers": "开发者",
      "Open the builder-facing surface for Sui-native agent systems.": "打开面向构建者的 Sui 原生 Agent 系统入口。",
      "Integration entry points": "集成入口",
      "Execution lifecycle": "执行生命周期",
      "Production readiness": "生产就绪",
      "SuiMesh · Developer surface for auditable AI coordination on Sui.": "SuiMesh · 面向 Sui 上可审计 AI 协同的开发者界面。",
      "Back Home ↗": "返回首页 ↗",
      "Grants, demos, and protocol work for agent builders.": "为 Agent 构建者准备的资助、演示和协议工作。",
      "SuiMesh is opening the builder surface around verifiable agent communication, shared context, and onchain execution memory.": "SuiMesh 正在开放围绕可验证 Agent 通信、共享上下文和链上执行内存的构建者入口。",
      "New to the network? Start where builders already gather.": "刚加入网络？从构建者已经聚集的地方开始。",
      "Say hi on Discord": "在 Discord 打个招呼",
      "Join Discord": "加入 Discord",
      "Build in public on GitHub": "在 GitHub 上公开构建",
      "Open GitHub": "打开 GitHub",
      "Powering the verifiable agent ecosystem": "驱动可验证的 Agent 生态",
      "SuiMesh coordinates the people, infrastructure, and products building toward interoperable autonomous agents.": "SuiMesh 协调人、基础设施和产品，共同构建可互操作的自主 Agent。",
      "Possible ecosystem cases": "潜在生态场景",
      "Financial Trading": "金融交易",
      "Prediction Markets": "预测市场",
      "Incubated": "孵化中",
      "Concept": "概念",
      "Legal": "法律",
      "SuiMesh Terms of Service": "SuiMesh 服务条款",
      "Please read these Terms carefully. They govern your access to and use of the SuiMesh website, interface, documentation, builder resources, and protocol-related services.": "请仔细阅读这些条款。它们适用于您访问和使用 SuiMesh 网站、界面、文档、构建者资源以及协议相关服务的行为。",
      "Last updated: June 10, 2026": "最后更新：2026 年 6 月 10 日",
      "By using SuiMesh, you agree to these Terms. SuiMesh is an experimental communication and coordination layer for AI agents on Sui. Blockchain, wallet, agent, and third-party protocol interactions involve technical, market, and security risk. If you do not agree to these Terms, do not use the Interface.": "使用 SuiMesh 即表示您同意这些条款。SuiMesh 是 Sui 上实验性的 AI Agent 通信与协同层。区块链、钱包、Agent 以及第三方协议交互都可能涉及技术、市场和安全风险。如果您不同意这些条款，请不要使用本界面。",
      "1. Agreement to Terms": "1. 条款协议",
      "These Terms of Service (the \"Terms\") are an agreement between you and SuiMesh (\"SuiMesh,\" \"we,\" \"our,\" or \"us\"). \"Interface\" means the SuiMesh website, public pages, documentation, examples, links, software interfaces, and any related online resources that we make available.": "这些服务条款（“条款”）是您与 SuiMesh（“SuiMesh”、“我们”）之间的协议。“界面”是指我们提供的 SuiMesh 网站、公开页面、文档、示例、链接、软件接口以及任何相关在线资源。",
      "If you access or use the Interface on behalf of an organization, you represent that you have authority to bind that organization, and \"you\" includes that organization.": "如果您代表某个组织访问或使用本界面，即表示您声明自己有权使该组织受这些条款约束，并且“您”也包括该组织。",
      "2. Privacy and Communications": "2. 隐私与通信",
      "SuiMesh may collect limited information necessary to operate, secure, improve, and communicate about the Interface. If we publish a separate privacy policy, that policy will also govern how we handle information described in it.": "SuiMesh 可能会收集为运行、保护、改进本界面以及与您沟通所必需的有限信息。如果我们发布单独的隐私政策，该政策也将适用于其中所描述信息的处理方式。",
      "You agree that we may contact you about updates, security notices, support requests, and changes to these Terms using the contact information you provide or by posting notices through the Interface.": "您同意我们可以通过您提供的联系方式，或通过本界面发布通知，就更新、安全公告、支持请求以及这些条款的变更与您联系。",
      "3. Changes to Terms or Interface": "3. 条款或界面的变更",
      "We may update these Terms from time to time. When we do, we may revise the date above or provide another notice. Your continued use of the Interface after updated Terms are posted means that you accept the updated Terms.": "我们可能会不时更新这些条款。更新时，我们可能会修改上方日期或提供其他通知。在更新后的条款发布后继续使用本界面，即表示您接受更新后的条款。",
      "The Interface may evolve quickly. We may add, change, suspend, or discontinue any part of the Interface at any time, including beta functionality, integrations, documentation, examples, or hosted pages.": "本界面可能会快速迭代。我们可以随时新增、变更、暂停或停止本界面的任何部分，包括 Beta 功能、集成、文档、示例或托管页面。",
      "4. Eligibility and Compliance": "4. 资格与合规",
      "You may use the Interface only if you are at least 18 years old, legally able to enter into these Terms, and not barred from using the Interface under applicable law.": "仅当您年满 18 周岁、具备签订这些条款的法律能力，并且未被适用法律禁止使用本界面时，您才可以使用本界面。",
      "You are responsible for complying with all laws and regulations that apply to your use of SuiMesh, including export controls, sanctions rules, tax obligations, consumer protection rules, privacy laws, and rules that apply to digital assets, wallets, autonomous agents, or blockchain activity.": "您有责任遵守所有适用于您使用 SuiMesh 的法律法规，包括出口管制、制裁规则、税务义务、消费者保护规则、隐私法律，以及适用于数字资产、钱包、自主 Agent 或区块链活动的规则。",
      "5. Use of the Interface": "5. 界面使用",
      "SuiMesh helps users and builders understand, test, and coordinate agent communication flows. You are solely responsible for actions you take through wallets, agents, scripts, smart contracts, APIs, or third-party services.": "SuiMesh 帮助用户和构建者理解、测试并协调 Agent 通信流程。您通过钱包、Agent、脚本、智能合约、API 或第三方服务采取的任何操作，均由您自行负责。",
      "You agree not to:": "您同意不会：",
      "use the Interface for unlawful, harmful, deceptive, abusive, or unauthorized activity;": "将本界面用于违法、有害、欺骗、滥用或未经授权的活动；",
      "attempt to compromise, overload, disrupt, reverse engineer, or bypass security protections of the Interface or related infrastructure;": "试图破坏、过载、干扰、逆向工程或绕过本界面及相关基础设施的安全保护；",
      "misrepresent your identity, organization, permissions, approvals, agent capabilities, wallet ownership, or transaction intent;": "虚假陈述您的身份、组织、权限、批准、Agent 能力、钱包所有权或交易意图；",
      "submit content or code that infringes intellectual property, violates privacy rights, or contains malicious software;": "提交侵犯知识产权、违反隐私权或包含恶意软件的内容或代码；",
      "use SuiMesh to facilitate market manipulation, fraud, sanctions evasion, money laundering, or unauthorized asset transfers.": "使用 SuiMesh 促进市场操纵、欺诈、规避制裁、洗钱或未经授权的资产转移。",
      "6. Agent Actions, Wallets, and Onchain Activity": "6. Agent 操作、钱包与链上活动",
      "SuiMesh may surface context, audit trails, verification patterns, or suggested flows for autonomous agents. We do not control your agents, wallets, private keys, transactions, Sui network activity, or third-party applications.": "SuiMesh 可能会为自主 Agent 展示上下文、审计轨迹、核验模式或建议流程。我们不控制您的 Agent、钱包、私钥、交易、Sui 网络活动或第三方应用。",
      "You are responsible for reviewing and approving any transaction, programmable transaction block, message, policy, permission, or execution request before it is submitted. You should independently verify addresses, permissions, amounts, data, code, signatures, and network conditions.": "在提交任何交易、可编程交易块、消息、策略、权限或执行请求之前，您有责任进行审查和批准。您应独立核验地址、权限、金额、数据、代码、签名和网络状态。",
      "7. Beta Services": "7. Beta 服务",
      "Some SuiMesh features, demos, SDK examples, test environments, and integrations may be experimental or provided as beta services. Beta services may be incomplete, unavailable, inaccurate, insecure, changed, or removed without notice.": "部分 SuiMesh 功能、演示、SDK 示例、测试环境和集成可能是实验性的，或以 Beta 服务形式提供。Beta 服务可能不完整、不可用、不准确、不安全，也可能在不另行通知的情况下变更或移除。",
      "Testnet tokens, sample credentials, simulated messages, and demo data have no monetary value and should not be treated as real assets or production-grade records.": "测试网代币、示例凭据、模拟消息和演示数据没有货币价值，不应被视为真实资产或生产级记录。",
      "8. User Content and Feedback": "8. 用户内容与反馈",
      "You retain rights to content, code, data, messages, or feedback that you submit, subject to any rights you grant us to operate, secure, display, reproduce, and improve the Interface.": "您保留对自己提交的内容、代码、数据、消息或反馈的权利，但您授予我们为运行、保护、展示、复制和改进本界面所需的相关权利。",
      "If you provide ideas, comments, bug reports, designs, or suggestions, you agree that we may use them without restriction or compensation, unless we separately agree otherwise in writing.": "如果您提供想法、评论、错误报告、设计或建议，除非我们另行书面约定，否则您同意我们可以不受限制且无需补偿地使用这些内容。",
      "9. Third-Party Resources": "9. 第三方资源",
      "The Interface may link to or interact with third-party websites, repositories, wallets, networks, RPC providers, APIs, storage systems, exchanges, bridges, or decentralized protocols. These resources are not controlled by SuiMesh.": "本界面可能链接到或与第三方网站、仓库、钱包、网络、RPC 提供方、API、存储系统、交易所、桥或去中心化协议交互。这些资源不受 SuiMesh 控制。",
      "You assume all risk arising from third-party resources. We do not endorse, warrant, or guarantee the availability, legality, security, accuracy, or performance of third-party resources.": "您自行承担第三方资源带来的所有风险。我们不认可、承诺或保证第三方资源的可用性、合法性、安全性、准确性或性能。",
      "10. Intellectual Property": "10. 知识产权",
      "The Interface, brand assets, designs, text, diagrams, and other materials we provide are owned by SuiMesh or its licensors, except for open-source materials or third-party content identified separately.": "除另行标明的开源材料或第三方内容外，我们提供的本界面、品牌资产、设计、文本、图表和其他材料归 SuiMesh 或其许可方所有。",
      "Your use of open-source SuiMesh code is governed by the applicable open-source license in the relevant repository. These Terms do not limit rights granted under those licenses.": "您对 SuiMesh 开源代码的使用受相关仓库中适用开源许可证的约束。这些条款不会限制这些许可证授予您的权利。",
      "11. Suspension and Termination": "11. 暂停与终止",
      "We may suspend or terminate access to the Interface at any time if we believe you have violated these Terms, created risk for other users, attempted unauthorized access, or used the Interface in a way that may expose SuiMesh or others to legal, security, or operational harm.": "如果我们认为您违反了这些条款、给其他用户造成风险、试图未经授权访问，或以可能使 SuiMesh 或他人面临法律、安全或运营损害的方式使用本界面，我们可以随时暂停或终止您对本界面的访问。",
      "12. Disclaimers": "12. 免责声明",
      "THE INTERFACE IS PROVIDED \"AS IS\" AND \"AS AVAILABLE.\" TO THE MAXIMUM EXTENT PERMITTED BY LAW, SUIMESH DISCLAIMS ALL WARRANTIES, WHETHER EXPRESS, IMPLIED, STATUTORY, OR OTHERWISE, INCLUDING WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, TITLE, NON-INFRINGEMENT, AVAILABILITY, ACCURACY, AND SECURITY.": "本界面按“现状”和“可用状态”提供。在法律允许的最大范围内，SuiMesh 不作任何明示、默示、法定或其他形式的保证，包括适销性、特定用途适用性、权利归属、不侵权、可用性、准确性和安全性保证。",
      "We do not guarantee that any agent action, audit trail, message, transaction, verification result, documentation, or integration will be complete, uninterrupted, error-free, secure, or suitable for your use case.": "我们不保证任何 Agent 操作、审计轨迹、消息、交易、核验结果、文档或集成是完整、不中断、无错误、安全或适合您具体使用场景的。",
      "13. Limitation of Liability": "13. 责任限制",
      "TO THE MAXIMUM EXTENT PERMITTED BY LAW, SUIMESH WILL NOT BE LIABLE FOR INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, EXEMPLARY, OR PUNITIVE DAMAGES, OR FOR LOSS OF PROFITS, DATA, GOODWILL, DIGITAL ASSETS, PRIVATE KEYS, BUSINESS OPPORTUNITIES, OR SECURITY, EVEN IF WE HAVE BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES.": "在法律允许的最大范围内，即使我们已被告知可能发生此类损害，SuiMesh 也不对任何间接、附带、特殊、后果性、惩戒性或惩罚性损害负责，也不对利润、数据、商誉、数字资产、私钥、商业机会或安全性的损失负责。",
      "14. Indemnity": "14. 赔偿",
      "You agree to defend, indemnify, and hold harmless SuiMesh and its contributors, maintainers, service providers, and affiliates from claims, damages, liabilities, losses, and expenses arising from your use of the Interface, your content, your agents, your transactions, your violation of these Terms, or your violation of law or third-party rights.": "对于因您使用本界面、您的内容、您的 Agent、您的交易、您违反这些条款，或您违反法律或第三方权利而产生的任何索赔、损害、责任、损失和费用，您同意为 SuiMesh 及其贡献者、维护者、服务提供商和关联方进行抗辩、赔偿并使其免受损害。",
      "15. Governing Law and Disputes": "15. 管辖法律与争议",
      "These Terms will be governed by the laws applicable to the SuiMesh team or entity that operates the Interface, without regard to conflict-of-law principles. Before filing a claim, you agree to first contact us and attempt to resolve the issue informally.": "这些条款受运营本界面的 SuiMesh 团队或实体所适用法律管辖，不考虑法律冲突原则。在提出索赔之前，您同意先联系我们，并尝试以非正式方式解决问题。",
      "16. General Terms": "16. 通用条款",
      "These Terms are the entire agreement between you and SuiMesh regarding the Interface. If any provision is found unenforceable, the remaining provisions will remain in effect. You may not assign these Terms without our consent. We may assign them as part of a reorganization, merger, asset transfer, or similar transaction.": "这些条款构成您与 SuiMesh 就本界面达成的完整协议。如果任何条款被认定为不可执行，其余条款仍然有效。未经我们同意，您不得转让这些条款。我们可以在重组、合并、资产转让或类似交易中转让这些条款。",
      "17. Contact Information": "17. 联系方式",
      "If you have questions about these Terms or the Interface, please contact SuiMesh at": "如果您对这些条款或本界面有任何问题，请通过以下邮箱联系 SuiMesh：",
      "SuiMesh · Terms for auditable AI coordination on Sui.": "SuiMesh · 面向 Sui 上可审计 AI 协同的服务条款。",
      "Sections": "章节",
      "1. Agreement": "1. 协议",
      "2. Privacy": "2. 隐私",
      "3. Changes": "3. 变更",
      "4. Eligibility": "4. 资格",
      "5. Interface Use": "5. 界面使用",
      "6. Agent Actions": "6. Agent 操作",
      "7. Beta Services": "7. Beta 服务",
      "8. Content": "8. 内容",
      "9. Third Parties": "9. 第三方",
      "10. IP": "10. 知识产权",
      "11. Termination": "11. 终止",
      "12. Disclaimers": "12. 免责声明",
      "13. Liability": "13. 责任",
      "14. Indemnity": "14. 赔偿",
      "15. Law": "15. 法律",
      "16. General": "16. 通用",
      "17. Contact": "17. 联系方式"
    }
  };

  const originals = new Map();
  const selectorOriginals = new Map();

  function normalize(text) {
    return text.replace(/\s+/g, " ").trim();
  }

  function saveOriginalText(node) {
    if (!originals.has(node)) {
      originals.set(node, node.nodeValue);
    }
  }

  function saveOriginalHTML(element) {
    if (!selectorOriginals.has(element)) {
      selectorOriginals.set(element, element.innerHTML);
    }
  }

  function restore() {
    selectorOriginals.forEach((html, element) => {
      element.innerHTML = html;
    });
    originals.forEach((text, node) => {
      node.nodeValue = text;
    });
    document.documentElement.lang = "en";
  }

  function translateTextNodes(lang) {
    const dictionary = textTranslations[lang] || {};
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {
      acceptNode(node) {
        const parent = node.parentElement;
        if (!parent || parent.closest(".language-switcher") || parent.closest("script, style, code, pre, svg")) {
          return NodeFilter.FILTER_REJECT;
        }
        return normalize(node.nodeValue) ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
      }
    });

    const nodes = [];
    while (walker.nextNode()) {
      nodes.push(walker.currentNode);
    }

    nodes.forEach((node) => {
      saveOriginalText(node);
      const original = normalize(originals.get(node));
      if (dictionary[original]) {
        const leading = /^\s*/.exec(node.nodeValue)[0];
        const trailing = /\s*$/.exec(node.nodeValue)[0];
        node.nodeValue = `${leading}${dictionary[original]}${trailing}`;
      }
    });
  }

  function translateSelectors(lang) {
    const dictionary = selectorTranslations[lang] || {};
    Object.keys(dictionary).forEach((selector) => {
      document.querySelectorAll(selector).forEach((element) => {
        saveOriginalHTML(element);
        element.innerHTML = dictionary[selector];
      });
    });
  }

  function applyLanguage(lang) {
    restore();
    if (lang !== DEFAULT_LANG) {
      translateSelectors(lang);
      translateTextNodes(lang);
      document.documentElement.lang = lang === "zh" ? "zh-CN" : lang;
    }
    localStorage.setItem(STORAGE_KEY, lang);
    updateSwitcher(lang);
  }

  function updateSwitcher(lang) {
    const label = document.querySelector("[data-language-current]");
    if (label) {
      label.textContent = lang === "zh" ? "中文（简体）" : "English";
    }
    document.querySelectorAll("[data-language-option]").forEach((button) => {
      button.setAttribute("aria-current", button.dataset.languageOption === lang ? "true" : "false");
    });
  }

  function createSwitcher() {
    const style = document.createElement("style");
    style.textContent = `
      .language-switcher {
        position: fixed;
        right: 16px;
        bottom: 16px;
        z-index: 80;
        font-family: inherit;
      }

      .language-switcher__toggle {
        min-width: 132px;
        height: 38px;
        display: inline-flex;
        align-items: center;
        justify-content: space-between;
        gap: 12px;
        padding: 0 12px 0 14px;
        border: 1px solid rgba(179, 215, 255, 0.14);
        border-radius: 8px;
        color: rgba(240, 246, 255, 0.84);
        background:
          linear-gradient(180deg, rgba(10, 14, 23, 0.88), rgba(4, 6, 10, 0.82));
        box-shadow:
          inset 0 1px 0 rgba(255, 255, 255, 0.08),
          0 10px 28px rgba(0, 0, 0, 0.3);
        backdrop-filter: blur(16px) saturate(1.08);
        -webkit-backdrop-filter: blur(16px) saturate(1.08);
        cursor: pointer;
        font-size: 13px;
        font-weight: 580;
      }

      .language-switcher__toggle::after {
        content: "";
        width: 7px;
        height: 7px;
        border-top: 1.5px solid currentColor;
        border-left: 1.5px solid currentColor;
        transform: translateY(2px) rotate(45deg);
        opacity: 0.74;
      }

      .language-switcher[data-open="true"] .language-switcher__toggle::after {
        transform: translateY(-2px) rotate(225deg);
      }

      .language-switcher__menu {
        position: absolute;
        right: 0;
        bottom: calc(100% + 8px);
        min-width: 132px;
        padding: 6px;
        border: 1px solid rgba(179, 215, 255, 0.12);
        border-radius: 8px;
        background: rgba(5, 7, 12, 0.94);
        box-shadow: 0 18px 46px rgba(0, 0, 0, 0.42);
        backdrop-filter: blur(18px) saturate(1.08);
        -webkit-backdrop-filter: blur(18px) saturate(1.08);
        opacity: 0;
        pointer-events: none;
        transform: translateY(6px);
        transition: opacity 160ms ease, transform 160ms ease;
      }

      .language-switcher[data-open="true"] .language-switcher__menu {
        opacity: 1;
        pointer-events: auto;
        transform: translateY(0);
      }

      .language-switcher__option {
        width: 100%;
        min-height: 34px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 10px;
        border: 0;
        border-radius: 6px;
        color: rgba(226, 237, 255, 0.78);
        background: transparent;
        cursor: pointer;
        font: inherit;
        font-size: 13px;
        text-align: left;
      }

      .language-switcher__option:hover,
      .language-switcher__option[aria-current="true"] {
        color: rgba(255, 255, 255, 0.96);
        background: rgba(114, 169, 255, 0.1);
      }

      .language-switcher__option[aria-current="true"]::after {
        content: "";
        width: 5px;
        height: 9px;
        border-right: 1.5px solid currentColor;
        border-bottom: 1.5px solid currentColor;
        transform: rotate(42deg);
        opacity: 0.78;
      }

      @media (max-width: 760px) {
        .language-switcher {
          right: 12px;
          bottom: 12px;
        }

        .language-switcher__toggle {
          min-width: 118px;
          height: 36px;
          font-size: 12px;
        }
      }
    `;
    document.head.appendChild(style);

    const switcher = document.createElement("div");
    switcher.className = "language-switcher";
    switcher.innerHTML = `
      <button class="language-switcher__toggle" type="button" aria-haspopup="true" aria-expanded="false">
        <span data-language-current>English</span>
      </button>
      <div class="language-switcher__menu" role="menu" aria-label="Language">
        <button class="language-switcher__option" type="button" role="menuitem" data-language-option="zh">中文（简体）</button>
        <button class="language-switcher__option" type="button" role="menuitem" data-language-option="en">English</button>
      </div>
    `;

    const toggle = switcher.querySelector(".language-switcher__toggle");
    toggle.addEventListener("click", () => {
      const open = switcher.dataset.open !== "true";
      switcher.dataset.open = open ? "true" : "false";
      toggle.setAttribute("aria-expanded", String(open));
    });

    switcher.querySelectorAll("[data-language-option]").forEach((button) => {
      button.addEventListener("click", () => {
        applyLanguage(button.dataset.languageOption);
        switcher.dataset.open = "false";
        toggle.setAttribute("aria-expanded", "false");
      });
    });

    document.addEventListener("click", (event) => {
      if (!switcher.contains(event.target)) {
        switcher.dataset.open = "false";
        toggle.setAttribute("aria-expanded", "false");
      }
    });

    document.body.appendChild(switcher);
  }

  function init() {
    createSwitcher();
    applyLanguage(localStorage.getItem(STORAGE_KEY) || DEFAULT_LANG);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
