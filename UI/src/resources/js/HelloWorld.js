// Create Global Withme Object
window.Withme = window.Withme || {};

Withme.Objects = {
    // 문자열 조작
    String: {
        _fillZeroData: ['', '0', '00', '000', '0000', '00000'],
        isValue: function(pStr, pValue) {
            return String(((pStr === null || pStr === undefined) ? pValue : pStr));
        },
        fillZero: function(pStr, pWidth) {
            var lStr = String(pStr);
            var i = Number(pWidth) - lStr.length;

            for(; i > 0; --i) {
                lStr = '0' + lStr;
            }

            return lStr;
        },
        numToCommaNum: function(pNum) {
            var lNumStr;
            var lNumLength;
            var lSosu;

            lNumStr = String(Withme.Objects.String.commaNumToNum(pNum));
            lNumLength = lNumStr.lastIndexOf(".");

            if(lNumLength > 0) {
                pNum = lNumStr.substr(0, lNumLength);
                lSosu = lNumStr.substr(lNumLength);
            } else {
                pNum = lNumStr;
                lSosu = "";
            }

            lNumStr = "";

            lNumLength = pNum.length;

            while(lNumLength > 3) {
                lNumStr = "," + pNum.substr(lNumLength - 3, 3) + lNumStr;
                lNumLength -= 3;
            }

            lNumStr = pNum.substr(0, lNumLength) + lNumStr + lSosu;

            return String(lNumStr);
        },
        commaNumToNum: function(pNum) {
            var lNumber = Number(String(pNum).replace(/,/g, ""));

            if(isNaN(lNumber)) {
                return 0;
            } else {
                return Number(lNumber);
            }
        }
    },
    // Date 관련
    Date: {
        fancy: function(pDate) {
            var t;

            if(pDate instanceof Date) {
                t = (new Date()).getTime() - pDate.getTime();
            } else {
                t = pDate;
            }

            // t is ms
            t = t / 1000;

            if(t < 0) {
                return '아직';
            } else if(t < 300) {
                return '방금';
            } else if(t > 86400) {
                return Math.floor(t / 85400) + '일';
            } else if(t > 3600) {
                return Math.floor(t / 3600) + '시간';
            } else if(t > 60) {
                return Math.floor(t / 60) + '분';
            } else {
                return Withme.Objects.Date.format({ date: pDate, format: "yyyy-mm-dd hh:nn:ss" });
            }
        },
        format: function(pData){
            var pParamDate = pData.date;
            var pParamFormat = pData.format;
            var pParamFillZero = pData.fillZero;
            var pParamBrace = pData.brace;

            if(typeof pParamDate === 'string'){
                pParamDate = pParamDate.replace(/-/g, '/');
            }
            var lDateInstance = new Date(pParamDate);
            if(pParamFillZero === undefined){
                pParamFillZero = true;
            }
            var lFillZero = function(pStr, pWidth){
                if(!pParamFillZero){
                return String(pStr);
                }
                var inZeroStr = '';
                for(var i=0, endi=(pWidth - String(pStr).length); i<endi; ++i){
                inZeroStr += '0';
                }
                return inZeroStr + pStr;
            };
            var lParamStrGen = function(pStr){
                var inStrCount = 0;
                var inRetStr = '';
                var inStartIndex = pParamFormat.indexOf(pStr + pStr);
                if(inStartIndex > -1){
                for(var i=inStartIndex, endi=pParamFormat.length; i<endi; ++i){
                    if(pParamFormat[i] === pStr){
                    inStrCount++;
                    } else {
                    break;
                    }
                }
                for(var i=0, endi=inStrCount; i<endi; ++i){
                    inRetStr += pStr;
                } 
                }
                return inRetStr;
            };

            var lRet = pParamFormat;

            if(pParamFormat.indexOf('yy') > -1){
                var lYear = (function(){
                var inYearStr = String(lDateInstance.getFullYear());
                var inYearStrLen = inYearStr.length;
                var inRetStr = '';
                for(var i=0, endi=lParamStrGen('y').length; i<endi; ++i){
                    if(inYearStr[(inYearStrLen-1)-i]){
                    inRetStr = inYearStr[(inYearStrLen-1)-i] + inRetStr;
                    }
                }
                return inRetStr;
                })();
                lRet = lRet.replace(pParamBrace ? /{([{y*}]+)}/gi : lParamStrGen('y'), lYear);
            }
            if(pParamFormat.indexOf('mm') > -1){
                var lMonth = lFillZero(lDateInstance.getMonth()+1, 2);
                lRet = lRet.replace(pParamBrace ? /{([{m*}]+)}/gi : lParamStrGen('m'), lMonth);
            }
            if(pParamFormat.indexOf('dd') > -1){
                var lDay = lFillZero(lDateInstance.getDate(), 2);
                lRet = lRet.replace(pParamBrace ? /{([{d*}]+)}/gi : lParamStrGen('d'), lDay);
            }
            if(pParamFormat.indexOf('hh') > -1){
                var lHours = lFillZero(lDateInstance.getHours(), 2);
                lRet = lRet.replace(pParamBrace ? /{([{h*}]+)}/gi : lParamStrGen('h'), lHours);
            }
            if(pParamFormat.indexOf('nn') > -1){
                var lMinutes = lFillZero(lDateInstance.getMinutes(), 2);
                lRet = lRet.replace(pParamBrace ? /{([{n*}]+)}/gi : lParamStrGen('n'), lMinutes);
            }
            if(pParamFormat.indexOf('ss') > -1){
                var lSeconds = lFillZero(lDateInstance.getSeconds(), 2);
                lRet = lRet.replace(pParamBrace ? /{([{s*}]+)}/gi : lParamStrGen('s'), lSeconds);
            }
            return lRet;
        },
        format2: function(pDate, pFormat) {
            if(pDate && !(pDate instanceof Date)) {
                pDate = new Date(pDate);
            }

            var lFillZero = Withme.Objects.String.fillZero;

            if(pDate && pFormat) {
                switch(pFormat) {
                    case "yyyy-mm-ddThh:nn:ss":
                        pDate = lFillZero(pDate.getFullYear(), 4) + '-' + lFillZero(pDate.getMonth() + 1, 2) + '-' + lFillZero(pDate.getDate(), 2) + 'T' + lFillZero(pDate.getHours(), 2) + ':' + lFillZero(pDate.getMinutes(), 2) + ':' + lFillZero(pDate.getSeconds(), 2);
                        break;
                    case "yyyy-mm-dd hh:nn:ss":
                        pDate = lFillZero(pDate.getFullYear(), 4) + '-' + lFillZero(pDate.getMonth() + 1, 2) + '-' + lFillZero(pDate.getDate(), 2) + ' ' + lFillZero(pDate.getHours(), 2) + ':' + lFillZero(pDate.getMinutes(), 2) + ':' + lFillZero(pDate.getSeconds(), 2);
                        break;
                    case "yyyy-mm-dd hh:nn":
                        pDate = lFillZero(pDate.getFullYear(), 4) + '-' + lFillZero(pDate.getMonth() + 1, 2) + '-' + lFillZero(pDate.getDate(), 2) + ' ' + lFillZero(pDate.getHours(), 2) + ':' + lFillZero(pDate.getMinutes(), 2);
                        break;
                    case "yyyy-mm-dd":
                        pDate = lFillZero(pDate.getFullYear(), 4) + '-' + lFillZero(pDate.getMonth() + 1, 2) + '-' + lFillZero(pDate.getDate(), 2);
                        break;
                    case "yyyymmddhhnnss":
                        pDate = lFillZero(pDate.getFullYear(), 4) + lFillZero(pDate.getMonth() + 1, 2) + lFillZero(pDate.getDate(), 2) + lFillZero(pDate.getHours(), 2) + lFillZero(pDate.getMinutes(), 2) + lFillZero(pDate.getSeconds(), 2);
                        break;
                    case "yyyymmdd":
                        pDate = lFillZero(pDate.getFullYear(), 4) + lFillZero(pDate.getMonth() + 1, 2) + lFillZero(pDate.getDate(), 2);
                        break;
                    default:
                        break;
                }
            } else {
                pDate = "";
            }

            return pDate;
        },
        getOffset: function(pDate) {
            var lFillZero = Withme.Objects.String.fillZero;

            var sign = (pDate.getTimezoneOffset() > 0) ? "-" : "+";
            var offset = Math.abs(pDate.getTimezoneOffset());
            var hours = lFillZero(Math.floor(offset / 60), 2);
            var minutes = lFillZero(offset % 60, 2);
            return sign + hours + ":" + minutes;
        },
        // 해당 년 월의 마지막 일
        getLastDate: function(pYear, pMonth) {
          return new Date(pYear, pMonth, 0).getDate();
        },
        // 시작일 ~ 종료일 리스트
        getDateRage: function(pData){
            var lFillZero = Withme.Objects.String.fillZero
            var lRet = {
                list: [],
                hash: {}
            };
            // 시작일부터 종료일 까지 자동 리스트 추가
            var lAddList = function(pData, pYear, pMonth, pStartDate, pEndDate){
                var inAddData
                var inIncreaseCount = 0
                pEndDate = (pEndDate - pStartDate)
                while(pEndDate >= 0){
                    inAddData = {
                        key: pYear + '-' + lFillZero(pMonth,2) + '-' + lFillZero((pStartDate + inIncreaseCount), 2),
                        data: pData
                    }
                    if(pData.filter && typeof pData.filter === 'function'){
                        if(pData.filter(inAddData)){
                            lRet.list.push(inAddData);
                            if(!lRet.hash.hasOwnProperty(inAddData.key)){
                                lRet.hash[inAddData.key] = [];
                            }
                            lRet.hash[inAddData.key].push(inAddData)
                        }
                    } else {
                        lRet.list.push(inAddData)
                        if(!lRet.hash.hasOwnProperty(inAddData.key)){
                            lRet.hash[inAddData.key] = [];
                        }
                        lRet.hash[inAddData.key].push(inAddData);
                    }
                    inIncreaseCount++;
                    pEndDate--;
                }
            }
            // 시작일
            var lStartAt = new Date(pData.startAt)
            var lStartAtYear = lStartAt.getFullYear()
            var lStartAtMonth = lStartAt.getMonth() + 1
            var lStartAtDate = lStartAt.getDate()
            // 종료일
            var lEndAt = new Date(pData.endAt)
            var lEndAtYear = lEndAt.getFullYear()
            var lEndAtMonth = lEndAt.getMonth() + 1
            var lEndAtDate = lEndAt.getDate()
            // startmonth 임시 캐싱
            var inTempStartAtMonth = lStartAtMonth
            while(inTempStartAtMonth <= lEndAtMonth){
                if(lStartAtMonth === lEndAtMonth){ // 시작월, 종료월 같음
                    lAddList(pData, lStartAtYear, lStartAtMonth, lStartAtDate, lEndAtDate)
                    } else { // 시작일이 종료일보다 작은경우
                    if(inTempStartAtMonth === lStartAtMonth){
                        lAddList(pData, lStartAtYear, inTempStartAtMonth, lStartAtDate, this.getLastDate(lStartAtYear, inTempStartAtMonth))
                    } else if(inTempStartAtMonth < lEndAtMonth){
                        lAddList(pData, lStartAtYear, inTempStartAtMonth, 1, this.getLastDate(lStartAtYear, inTempStartAtMonth))
                    } else if(inTempStartAtMonth === lEndAtMonth){
                        lAddList(pData, lStartAtYear, inTempStartAtMonth, 1, lEndAtDate)
                    } else {
                        console.log('error', '잘못된 일정');
                    }
                }
                inTempStartAtMonth++
            }
            return lRet
        }
    }
};

// Locale
Withme.Locale = {
    locale: 'ko',
    setLang: function (pLocale){
        this.locale = pLocale;
    },
    getLocale: function (){
        return this.locale;
    }
};

// Classes
Withme.Classes = {
  DepthTree : {
    Node : (function () {
        var Node = function () {
            if (!(this instanceof Node)) {
                return new TreeNode();
            }
            // ### Private Member
            var privateMember = {
                key: undefined, // 노드 키
                parentNode: undefined, // 부모 노드 참조
                childNodes: {
                    hash: {},
                    size : 0
                }, // 자식 노드들을 참조
                data: undefined // 노드의 데이터
            };
            // Private Member ###
            // ### Private Method
            var privateMethod = {
                getKey: function () { // 노드키 반환
                    return privateMember.key
                },
                getParent: function () { // 부모 노드 반환
                    return privateMember.parentNode;
                },
                setParent: function (pNode) { // 부모 노드 설정
                    privateMember.parentNode = pNode;
                },
                getChild: function (pKey) { // 자식 노드 반환
                    if (pKey) {
                        return privateMember.childNodes.hash[pKey];
                    } else {
                        console.log('### error : 검색할 자식노드의 pKey 파라메터가 없습니다.')
                    }
                },
                getChildHash: function () { // 자식 노드들을 반환
                    if (privateMember.childNodes.size > 0) {
                        return privateMember.childNodes.hash;
                    } else {
                        return undefined;
                    }
                },
                getData: function () { // 노드 데이터 반환
                    return privateMember.data;
                },
                addChild: function (pNode) { // 자식 노드 추가
                    if (privateMember.childNodes.hash[pNode.getKey()]) {
                        console.log('### error : 이미 노드가 존재함(' + pNode.getKey() + ')');
                        return undefined;
                    } else {
                        privateMember.childNodes.size++;
                        privateMember.childNodes.hash[pNode.getKey()] = pNode;
                        return privateMember.childNodes.hash[pNode.getKey()];
                    }
                },
                removeChild: function (pKey) { // 자식 노드 제거
                    if (privateMember.childNodes.hash[pKey]) {
                        privateMember.childNodes.size--;
                        var lRemove = privateMember.childNodes.hash[pKey];
                        delete privateMember.childNodes.hash[pKey];
                        return lRemove;
                    } else {
                        console.log('### error : 자식 노드 없음(' + pKey + ')');
                        return undefined;
                    }
                },
                setNode: function (pKey, pData) { // 노드 데이터 설정
                    privateMember.key = pKey;
                    privateMember.data = pData;
                }
            };
            // Private Method ###
            // ### Public Method
            this.getKey = privateMethod.getKey;
            this.getParent = privateMethod.getParent;
            this.setParent =privateMethod.setParent;
            this.getChild = privateMethod.getChild;
            this.getChildHash = privateMethod.getChildHash;
            this.getData = privateMethod.getData;
            this.addChild =privateMethod.addChild;
            this.removeChild = privateMethod.removeChild;
            this.setNode = privateMethod.setNode;
            // Public Method ###
        };
        return Node;
    })(),
    Tree : (function () {
        var DepthTree = function () {
            if (!(this instanceof DepthTree)) {
                return new DepthTree();
            }
            // ### Private Member
            var privateMember = {
                tree : undefined, // 트리 참조
                hash : {} // 해시 테이블 참조
            };
            // Private Member ###
            // ### Private Method
            var privateMethod = {
                init: function () { // 초기화

                },
                addNodeInstance: function (pNode, pParentKey) { // 인스턴스화된 노드를 추가한다.
                    var lHash = privateMember.hash;
                    // 추가될 노드와 노드의 자식 노드들을 해시 테이블에 추가한다.
                    var searchChildNodes = function (pSearchNode) {
                        var inChildNode = pSearchNode.getChildHash();
                        for (var key in inChildNode) {
                            if (lHash[inChildNode[key].getKey()] === false) {
                                lHash[inChildNode[key].getKey()] = inChildNode[key];
                            }
                            searchChildNodes(inChildNode[key].getChildHash());
                        }
                    };
                    searchChildNodes(pNode);
                    // 부모 노드에 노드 추가
                    if (lHash[pParentKey]) {
                        lHash[pParentKey].addChild(pNode);
                        return pNode;
                    }
                },
                putNode: function (pKey, pParentKey, pData) {
                    var lHash = privateMember.hash;
                    var lNodeData = privateMethod.addNode(pKey, pParentKey, pData);

                    if(!lNodeData) {
                        lHash[pKey].setNode(pKey, pData);
                        lNodeData = lHash[pKey];
                    }

                    return lNodeData;
                },
                addNode: function (pKey, pParentKey, pData) { // 노드 추가
                    // 노드의 데이터를 추가하고, 부모 노드와 자식노드에 대한 링크를 설정한다.
                    var lHash = privateMember.hash;

                    if (lHash[pKey]) { // 추가할 노드가 존재한다면
                        return undefined;
                    } else {
                        var lNode = new Withme.Classes.DepthTree.Node();
                        lNode.setNode(pKey, pData); // 노드 정보 설정
                        if (privateMethod.getRootNode() === undefined) { // 루트노드가 없다면
                            privateMember.tree = lNode; // 루트 노드
                            lNode.setParent(undefined); // 노드에 부모 노드
                        } else {
                            if(lHash[pParentKey]){ // 부모노드 존재여부 확인
                                lHash[pParentKey].addChild(lNode); // 부모 노드에 자식노드로 추가
                                lNode.setParent(lHash[pParentKey]); // 노드에 부모 노드 링크
                            } else {
                                console.log('###error : 부모노드가 존재하지 않아 추가하지 못함');
                                console.log('부모노드 키 :'+ pParentKey +', 추가할 노드 키 :'+ pKey +', 추가할 메뉴 : '+ pData.rawData.getTitle() +')');
                            }
                        }
                        lHash[pKey] = lNode; // 해시 리스트에 노드 추가
                        return lHash[pKey];
                    }
                },
                findNode: function (pKey) { // 노드 검색
                    if (privateMember.hash[pKey]) {
                        return privateMember.hash[pKey];
                    } else {
                        // console.log('### error : 검색된 노드가 없음\n', arguments);
                    }
                },
                getRootNode: function () { // 루트 노드 반환
                    return privateMember.tree;
                },
                getParentsNode: function(pKey){ // 현재 노드의 부모노드들을 Array로 반환
                    var lHash = privateMember.hash;
                    var lParentsArray = [];
                    var searchParentsNode = function (pNode) {
                        if (pNode.getParent()) {
                            lParentsArray.unshift(pNode.getParent());
                            searchParentsNode(pNode.getParent());
                        } else {
                            return lParentsArray;
                        }
                    };
                    if(lHash[pKey]){
                        searchParentsNode(lHash[pKey]);
                    }
                    return lParentsArray;
                },
                removeNode: function (pKey) { // 노드 제거
                    privateMember.hash[pKey].getParent().removeChild(pKey); // 부모 노드에서 자식 노드 링크 제거
                    var rec = function (pNode) {
                        for (var key in pNode.getChildHash()) {
                            if (pNode.getChildHash()[key].getChildHash()) {
                                rec(pNode.getChildHash()[key]);
                            }
                            delete privateMember.hash[pNode.getChildHash()[key].getKey()];
                        }
                    }
                    rec(privateMember.hash[pKey]); // 해시 테이블에서 삭제 대상 노드의 자식 노드들을 모두 제거
                    delete privateMember.hash[pKey]; // 해시 테이블에서 삭제 대상 노드 제거
                },
                removeNodePull: function (pKey) { // 노드 제거 - 자식 노드의 링크를 부모 노드의 위치로끌어올림
                    for (var key in privateMember.hash[pKey].getChildHash()) {
                        // 자식 노드들의 부모 노드를 pKey의 부모 노드로 변경
                        privateMember.hash[pKey].getChildHash()[key].setParent(privateMember.hash[pKey].getParent());
                        // 변경된 부모 노드에 자식노드로 추가
                        privateMember.hash[pKey].getParent().addChild(privateMember.hash[pKey].getChildHash()[key]);
                    }
                    privateMember.hash[pKey].getParent().removeChild(pKey); // 부모 노드에서 자식 노드 링크 제거
                    delete privateMember.hash[pKey]; // 해시 테이블에서 노드 링크 제거
                },
                removeNodeChangeParent: function (pKey, pParentKey) { // 노드 제거 - 자식노드들의 부모 노드 링크를 특정 노드로 변경
                    for (var key in privateMember.hash[pKey].getChildHash()) {
                        // 자식 노드들의 부모 노드를 pParentKey 노드로 변경
                        privateMember.hash[pKey].getChildHash()[key].setParent(privateMember.hash[pParentKey]);
                        // 변경된 부모 노드에 자식노드로 추가
                        privateMember.hash[pParentKey].addChild(privateMember.hash[pKey].getChildHash()[key]);
                    }
                    privateMember.hash[pKey].getParent().removeChild(pKey); // 부모 노드에서 자식 노드 링크 제거
                    delete privateMember.hash[pKey]; // 해시 테이블에서 노드 링크 제거
                },
                getHash: function () {
                    return privateMember.hash;
                }
            };
            // Private Method ###
            privateMethod.init();

            // ### Public Method
            this.addNodeInstance = privateMethod.addNodeInstance;
            this.putNode = privateMethod.putNode;
            this.addNode = privateMethod.addNode;
            this.findNode = privateMethod.findNode;
            this.getRootNode = privateMethod.getRootNode;
            this.getHash = privateMethod.getHash;
            this.getParentsNode = privateMethod.getParentsNode;
            this.removeNode = privateMethod.removeNode;
            this.removeNodePull = privateMethod.removeNodePull;
            this.removeNodeChangeParent = privateMethod.removeNodeChangeParent;
            // Public Method ###
        };
        return DepthTree;
    })()
  }
}