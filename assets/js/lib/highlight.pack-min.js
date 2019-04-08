!function(e){var t="object"==typeof window&&window||"object"==typeof self&&self;"undefined"!=typeof exports?e(exports):t&&(t.hljs=e({}),"function"==typeof define&&define.amd&&define([],function(){return t.hljs}))}(function(e){var t=[],r=Object.keys,a={},n={},i=/^(no-?highlight|plain|text)$/i,s=/\blang(?:uage)?-([\w-]+)\b/i,o=/((^(<[^>]+>|\t|)+|(?:\n)))/gm,c={case_insensitive:"cI",lexemes:"l",contains:"c",keywords:"k",subLanguage:"sL",className:"cN",begin:"b",beginKeywords:"bK",end:"e",endsWithParent:"eW",illegal:"i",excludeBegin:"eB",excludeEnd:"eE",returnBegin:"rB",returnEnd:"rE",relevance:"r",variants:"v",IDENT_RE:"IR",UNDERSCORE_IDENT_RE:"UIR",NUMBER_RE:"NR",C_NUMBER_RE:"CNR",BINARY_NUMBER_RE:"BNR",RE_STARTERS_RE:"RSR",BACKSLASH_ESCAPE:"BE",APOS_STRING_MODE:"ASM",QUOTE_STRING_MODE:"QSM",PHRASAL_WORDS_MODE:"PWM",C_LINE_COMMENT_MODE:"CLCM",C_BLOCK_COMMENT_MODE:"CBCM",HASH_COMMENT_MODE:"HCM",NUMBER_MODE:"NM",C_NUMBER_MODE:"CNM",BINARY_NUMBER_MODE:"BNM",CSS_NUMBER_MODE:"CSSNM",REGEXP_MODE:"RM",TITLE_MODE:"TM",UNDERSCORE_TITLE_MODE:"UTM",COMMENT:"C",beginRe:"bR",endRe:"eR",illegalRe:"iR",lexemesRe:"lR",terminators:"t",terminator_end:"tE"},l="</span>",u={classPrefix:"hljs-",tabReplace:null,useBR:!1,languages:void 0};function d(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}function p(e){return e.nodeName.toLowerCase()}function b(e,t){var r=e&&e.exec(t);return r&&0===r.index}function m(e){return i.test(e)}function _(e){var t,r={},a=Array.prototype.slice.call(arguments,1);for(t in e)r[t]=e[t];return a.forEach(function(e){for(t in e)r[t]=e[t]}),r}function f(e){var t=[];return function e(r,a){for(var n=r.firstChild;n;n=n.nextSibling)3===n.nodeType?a+=n.nodeValue.length:1===n.nodeType&&(t.push({event:"start",offset:a,node:n}),a=e(n,a),p(n).match(/br|hr|img|input/)||t.push({event:"stop",offset:a,node:n}));return a}(e,0),t}function g(e){if(c&&!e.langApiRestored){for(var t in e.langApiRestored=!0,c)e[t]&&(e[c[t]]=e[t]);(e.c||[]).concat(e.v||[]).forEach(g)}}function h(e){function t(e){return e&&e.source||e}function a(r,a){return new RegExp(t(r),"m"+(e.cI?"i":"")+(a?"g":""))}!function n(i,s){if(!i.compiled){if(i.compiled=!0,i.k=i.k||i.bK,i.k){var o={},c=function(t,r){e.cI&&(r=r.toLowerCase()),r.split(" ").forEach(function(e){var r=e.split("|");o[r[0]]=[t,r[1]?Number(r[1]):1]})};"string"==typeof i.k?c("keyword",i.k):r(i.k).forEach(function(e){c(e,i.k[e])}),i.k=o}i.lR=a(i.l||/\w+/,!0),s&&(i.bK&&(i.b="\\b("+i.bK.split(" ").join("|")+")\\b"),i.b||(i.b=/\B|\b/),i.bR=a(i.b),i.endSameAsBegin&&(i.e=i.b),i.e||i.eW||(i.e=/\B|\b/),i.e&&(i.eR=a(i.e)),i.tE=t(i.e)||"",i.eW&&s.tE&&(i.tE+=(i.e?"|":"")+s.tE)),i.i&&(i.iR=a(i.i)),null==i.r&&(i.r=1),i.c||(i.c=[]),i.c=Array.prototype.concat.apply([],i.c.map(function(e){return(t="self"===e?i:e).v&&!t.cached_variants&&(t.cached_variants=t.v.map(function(e){return _(t,{v:null},e)})),t.cached_variants||t.eW&&[_(t)]||[t];var t})),i.c.forEach(function(e){n(e,i)}),i.starts&&n(i.starts,s);var l=i.c.map(function(e){return e.bK?"\\.?(?:"+e.b+")\\.?":e.b}).concat([i.tE,i.i]).map(t).filter(Boolean);i.t=l.length?a(function(e,r){for(var a=/\[(?:[^\\\]]|\\.)*\]|\(\??|\\([1-9][0-9]*)|\\./,n=0,i="",s=0;s<e.length;s++){var o=n,c=t(e[s]);for(0<s&&(i+="|");0<c.length;){var l=a.exec(c);if(null==l){i+=c;break}i+=c.substring(0,l.index),c=c.substring(l.index+l[0].length),"\\"==l[0][0]&&l[1]?i+="\\"+String(Number(l[1])+o):(i+=l[0],"("==l[0]&&n++)}}return i}(l),!0):{exec:function(){return null}}}}(e)}function v(e,t,r,n){function i(e,t,r,a){var n='<span class="'+(a?"":u.classPrefix);return(n+=e+'">')+t+(r?"":l)}function s(){g+=null!=_.sL?function(){var e="string"==typeof _.sL;if(e&&!a[_.sL])return d(E);var t=e?v(_.sL,E,!0,f[_.sL]):y(E,_.sL.length?_.sL:void 0);return 0<_.r&&(N+=t.r),e&&(f[_.sL]=t.top),i(t.language,t.value,!1,!0)}():function(){var e,t,r,a,n,s,o;if(!_.k)return d(E);for(a="",t=0,_.lR.lastIndex=0,r=_.lR.exec(E);r;)a+=d(E.substring(t,r.index)),n=_,s=r,o=p.cI?s[0].toLowerCase():s[0],(e=n.k.hasOwnProperty(o)&&n.k[o])?(N+=e[1],a+=i(e[0],d(r[0]))):a+=d(r[0]),t=_.lR.lastIndex,r=_.lR.exec(E);return a+d(E.substr(t))}(),E=""}function o(e){g+=e.cN?i(e.cN,"",!0):"",_=Object.create(e,{parent:{value:_}})}function c(e,t){if(E+=e,null==t)return s(),0;var a=function(e,t){var r,a,n;for(r=0,a=t.c.length;r<a;r++)if(b(t.c[r].bR,e))return t.c[r].endSameAsBegin&&(t.c[r].eR=(n=t.c[r].bR.exec(e)[0],new RegExp(n.replace(/[-\/\\^$*+?.()|[\]{}]/g,"\\$&"),"m"))),t.c[r]}(t,_);if(a)return a.skip?E+=t:(a.eB&&(E+=t),s(),a.rB||a.eB||(E=t)),o(a),a.rB?0:t.length;var n,i=function e(t,r){if(b(t.eR,r)){for(;t.endsParent&&t.parent;)t=t.parent;return t}if(t.eW)return e(t.parent,r)}(_,t);if(i){var c=_;for(c.skip?E+=t:(c.rE||c.eE||(E+=t),s(),c.eE&&(E=t));_.cN&&(g+=l),_.skip||_.sL||(N+=_.r),(_=_.parent)!==i.parent;);return i.starts&&(i.endSameAsBegin&&(i.starts.eR=i.eR),o(i.starts)),c.rE?0:t.length}if(n=t,!r&&b(_.iR,n))throw new Error('Illegal lexeme "'+t+'" for mode "'+(_.cN||"<unnamed>")+'"');return E+=t,t.length||1}var p=w(e);if(!p)throw new Error('Unknown language: "'+e+'"');h(p);var m,_=n||p,f={},g="";for(m=_;m!==p;m=m.parent)m.cN&&(g=i(m.cN,"",!0)+g);var E="",N=0;try{for(var x,M,k=0;_.t.lastIndex=k,x=_.t.exec(t);)M=c(t.substring(k,x.index),x[0]),k=x.index+M;for(c(t.substr(k)),m=_;m.parent;m=m.parent)m.cN&&(g+=l);return{r:N,value:g,language:e,top:_}}catch(e){if(e.message&&-1!==e.message.indexOf("Illegal"))return{r:0,value:d(t)};throw e}}function y(e,t){t=t||u.languages||r(a);var n={r:0,value:d(e)},i=n;return t.filter(w).filter(M).forEach(function(t){var r=v(t,e,!1);r.language=t,r.r>i.r&&(i=r),r.r>n.r&&(i=n,n=r)}),i.language&&(n.second_best=i),n}function E(e){return u.tabReplace||u.useBR?e.replace(o,function(e,t){return u.useBR&&"\n"===e?"<br>":u.tabReplace?t.replace(/\t/g,u.tabReplace):""}):e}function N(e){var r,a,i,o,c,l,b,_,g,h,N=function(e){var t,r,a,n,i=e.className+" ";if(i+=e.parentNode?e.parentNode.className:"",r=s.exec(i))return w(r[1])?r[1]:"no-highlight";for(t=0,a=(i=i.split(/\s+/)).length;t<a;t++)if(m(n=i[t])||w(n))return n}(e);m(N)||(u.useBR?(r=document.createElementNS("http://www.w3.org/1999/xhtml","div")).innerHTML=e.innerHTML.replace(/\n/g,"").replace(/<br[ \/]*>/g,"\n"):r=e,c=r.textContent,i=N?v(N,c,!0):y(c),(a=f(r)).length&&((o=document.createElementNS("http://www.w3.org/1999/xhtml","div")).innerHTML=i.value,i.value=function(e,r,a){var n=0,i="",s=[];function o(){return e.length&&r.length?e[0].offset!==r[0].offset?e[0].offset<r[0].offset?e:r:"start"===r[0].event?e:r:e.length?e:r}function c(e){i+="<"+p(e)+t.map.call(e.attributes,function(e){return" "+e.nodeName+'="'+d(e.value).replace('"',"&quot;")+'"'}).join("")+">"}function l(e){i+="</"+p(e)+">"}function u(e){("start"===e.event?c:l)(e.node)}for(;e.length||r.length;){var b=o();if(i+=d(a.substring(n,b[0].offset)),n=b[0].offset,b===e){for(s.reverse().forEach(l);u(b.splice(0,1)[0]),(b=o())===e&&b.length&&b[0].offset===n;);s.reverse().forEach(c)}else"start"===b[0].event?s.push(b[0].node):s.pop(),u(b.splice(0,1)[0])}return i+d(a.substr(n))}(a,f(o),c)),i.value=E(i.value),e.innerHTML=i.value,e.className=(l=e.className,b=N,_=i.language,g=b?n[b]:_,h=[l.trim()],l.match(/\bhljs\b/)||h.push("hljs"),-1===l.indexOf(g)&&h.push(g),h.join(" ").trim()),e.result={language:i.language,re:i.r},i.second_best&&(e.second_best={language:i.second_best.language,re:i.second_best.r}))}function x(){if(!x.called){x.called=!0;var e=document.querySelectorAll("pre code");t.forEach.call(e,N)}}function w(e){return e=(e||"").toLowerCase(),a[e]||a[n[e]]}function M(e){var t=w(e);return t&&!t.disableAutodetect}return e.highlight=v,e.highlightAuto=y,e.fixMarkup=E,e.highlightBlock=N,e.configure=function(e){u=_(u,e)},e.initHighlighting=x,e.initHighlightingOnLoad=function(){addEventListener("DOMContentLoaded",x,!1),addEventListener("load",x,!1)},e.registerLanguage=function(t,r){var i=a[t]=r(e);g(i),i.aliases&&i.aliases.forEach(function(e){n[e]=t})},e.listLanguages=function(){return r(a)},e.getLanguage=w,e.autoDetection=M,e.inherit=_,e.IR=e.IDENT_RE="[a-zA-Z]\\w*",e.UIR=e.UNDERSCORE_IDENT_RE="[a-zA-Z_]\\w*",e.NR=e.NUMBER_RE="\\b\\d+(\\.\\d+)?",e.CNR=e.C_NUMBER_RE="(-?)(\\b0[xX][a-fA-F0-9]+|(\\b\\d+(\\.\\d*)?|\\.\\d+)([eE][-+]?\\d+)?)",e.BNR=e.BINARY_NUMBER_RE="\\b(0b[01]+)",e.RSR=e.RE_STARTERS_RE="!|!=|!==|%|%=|&|&&|&=|\\*|\\*=|\\+|\\+=|,|-|-=|/=|/|:|;|<<|<<=|<=|<|===|==|=|>>>=|>>=|>=|>>>|>>|>|\\?|\\[|\\{|\\(|\\^|\\^=|\\||\\|=|\\|\\||~",e.BE=e.BACKSLASH_ESCAPE={b:"\\\\[\\s\\S]",r:0},e.ASM=e.APOS_STRING_MODE={cN:"string",b:"'",e:"'",i:"\\n",c:[e.BE]},e.QSM=e.QUOTE_STRING_MODE={cN:"string",b:'"',e:'"',i:"\\n",c:[e.BE]},e.PWM=e.PHRASAL_WORDS_MODE={b:/\b(a|an|the|are|I'm|isn't|don't|doesn't|won't|but|just|should|pretty|simply|enough|gonna|going|wtf|so|such|will|you|your|they|like|more)\b/},e.C=e.COMMENT=function(t,r,a){var n=e.inherit({cN:"comment",b:t,e:r,c:[]},a||{});return n.c.push(e.PWM),n.c.push({cN:"doctag",b:"(?:TODO|FIXME|NOTE|BUG|XXX):",r:0}),n},e.CLCM=e.C_LINE_COMMENT_MODE=e.C("//","$"),e.CBCM=e.C_BLOCK_COMMENT_MODE=e.C("/\\*","\\*/"),e.HCM=e.HASH_COMMENT_MODE=e.C("#","$"),e.NM=e.NUMBER_MODE={cN:"number",b:e.NR,r:0},e.CNM=e.C_NUMBER_MODE={cN:"number",b:e.CNR,r:0},e.BNM=e.BINARY_NUMBER_MODE={cN:"number",b:e.BNR,r:0},e.CSSNM=e.CSS_NUMBER_MODE={cN:"number",b:e.NR+"(%|em|ex|ch|rem|vw|vh|vmin|vmax|cm|mm|in|pt|pc|px|deg|grad|rad|turn|s|ms|Hz|kHz|dpi|dpcm|dppx)?",r:0},e.RM=e.REGEXP_MODE={cN:"regexp",b:/\//,e:/\/[gimuy]*/,i:/\n/,c:[e.BE,{b:/\[/,e:/\]/,r:0,c:[e.BE]}]},e.TM=e.TITLE_MODE={cN:"title",b:e.IR,r:0},e.UTM=e.UNDERSCORE_TITLE_MODE={cN:"title",b:e.UIR,r:0},e.METHOD_GUARD={b:"\\.\\s*"+e.UIR,r:0},e}),hljs.registerLanguage("php",function(e){var t={b:"\\$+[a-zA-Z_-ÿ][a-zA-Z0-9_-ÿ]*"},r={cN:"meta",b:/<\?(php)?|\?>/},a={cN:"string",c:[e.BE,r],v:[{b:'b"',e:'"'},{b:"b'",e:"'"},e.inherit(e.ASM,{i:null}),e.inherit(e.QSM,{i:null})]},n={v:[e.BNM,e.CNM]};return{aliases:["php","php3","php4","php5","php6","php7"],cI:!0,k:"and include_once list abstract global private echo interface as static endswitch array null if endwhile or const for endforeach self var while isset public protected exit foreach throw elseif include __FILE__ empty require_once do xor return parent clone use __CLASS__ __LINE__ else break print eval new catch __METHOD__ case exception default die require __FUNCTION__ enddeclare final try switch continue endfor endif declare unset true false trait goto instanceof insteadof __DIR__ __NAMESPACE__ yield finally",c:[e.HCM,e.C("//","$",{c:[r]}),e.C("/\\*","\\*/",{c:[{cN:"doctag",b:"@[A-Za-z]+"}]}),e.C("__halt_compiler.+?;",!1,{eW:!0,k:"__halt_compiler",l:e.UIR}),{cN:"string",b:/<<<['"]?\w+['"]?$/,e:/^\w+;?$/,c:[e.BE,{cN:"subst",v:[{b:/\$\w+/},{b:/\{\$/,e:/\}/}]}]},r,{cN:"keyword",b:/\$this\b/},t,{b:/(::|->)+[a-zA-Z_\x7f-\xff][a-zA-Z0-9_\x7f-\xff]*/},{cN:"function",bK:"function",e:/[;{]/,eE:!0,i:"\\$|\\[|%",c:[e.UTM,{cN:"params",b:"\\(",e:"\\)",c:["self",t,e.CBCM,a,n]}]},{cN:"class",bK:"class interface",e:"{",eE:!0,i:/[:\(\$"]/,c:[{bK:"extends implements"},e.UTM]},{bK:"namespace",e:";",i:/[\.']/,c:[e.UTM]},{bK:"use",e:";",c:[e.UTM]},{b:"=>"},a,n]}}),hljs.registerLanguage("sql",function(e){var t=e.C("--","$");return{cI:!0,i:/[<>{}*]/,c:[{bK:"begin end start commit rollback savepoint lock alter create drop rename call delete do handler insert load replace select truncate update set show pragma grant merge describe use explain help declare prepare execute deallocate release unlock purge reset change stop analyze cache flush optimize repair kill install uninstall checksum restore check backup revoke comment values with",e:/;/,eW:!0,l:/[\w\.]+/,k:{keyword:"as abort abs absolute acc acce accep accept access accessed accessible account acos action activate add addtime admin administer advanced advise aes_decrypt aes_encrypt after agent aggregate ali alia alias all allocate allow alter always analyze ancillary and anti any anydata anydataset anyschema anytype apply archive archived archivelog are as asc ascii asin assembly assertion associate asynchronous at atan atn2 attr attri attrib attribu attribut attribute attributes audit authenticated authentication authid authors auto autoallocate autodblink autoextend automatic availability avg backup badfile basicfile before begin beginning benchmark between bfile bfile_base big bigfile bin binary_double binary_float binlog bit_and bit_count bit_length bit_or bit_xor bitmap blob_base block blocksize body both bound bucket buffer_cache buffer_pool build bulk by byte byteordermark bytes cache caching call calling cancel capacity cascade cascaded case cast catalog category ceil ceiling chain change changed char_base char_length character_length characters characterset charindex charset charsetform charsetid check checksum checksum_agg child choose chr chunk class cleanup clear client clob clob_base clone close cluster_id cluster_probability cluster_set clustering coalesce coercibility col collate collation collect colu colum column column_value columns columns_updated comment commit compact compatibility compiled complete composite_limit compound compress compute concat concat_ws concurrent confirm conn connec connect connect_by_iscycle connect_by_isleaf connect_by_root connect_time connection consider consistent constant constraint constraints constructor container content contents context contributors controlfile conv convert convert_tz corr corr_k corr_s corresponding corruption cos cost count count_big counted covar_pop covar_samp cpu_per_call cpu_per_session crc32 create creation critical cross cube cume_dist curdate current current_date current_time current_timestamp current_user cursor curtime customdatum cycle data database databases datafile datafiles datalength date_add date_cache date_format date_sub dateadd datediff datefromparts datename datepart datetime2fromparts day day_to_second dayname dayofmonth dayofweek dayofyear days db_role_change dbtimezone ddl deallocate declare decode decompose decrement decrypt deduplicate def defa defau defaul default defaults deferred defi defin define degrees delayed delegate delete delete_all delimited demand dense_rank depth dequeue des_decrypt des_encrypt des_key_file desc descr descri describ describe descriptor deterministic diagnostics difference dimension direct_load directory disable disable_all disallow disassociate discardfile disconnect diskgroup distinct distinctrow distribute distributed div do document domain dotnet double downgrade drop dumpfile duplicate duration each edition editionable editions element ellipsis else elsif elt empty enable enable_all enclosed encode encoding encrypt end end-exec endian enforced engine engines enqueue enterprise entityescaping eomonth error errors escaped evalname evaluate event eventdata events except exception exceptions exchange exclude excluding execu execut execute exempt exists exit exp expire explain explode export export_set extended extent external external_1 external_2 externally extract failed failed_login_attempts failover failure far fast feature_set feature_value fetch field fields file file_name_convert filesystem_like_logging final finish first first_value fixed flash_cache flashback floor flush following follows for forall force foreign form forma format found found_rows freelist freelists freepools fresh from from_base64 from_days ftp full function general generated get get_format get_lock getdate getutcdate global global_name globally go goto grant grants greatest group group_concat group_id grouping grouping_id groups gtid_subtract guarantee guard handler hash hashkeys having hea head headi headin heading heap help hex hierarchy high high_priority hosts hour hours http id ident_current ident_incr ident_seed identified identity idle_time if ifnull ignore iif ilike ilm immediate import in include including increment index indexes indexing indextype indicator indices inet6_aton inet6_ntoa inet_aton inet_ntoa infile initial initialized initially initrans inmemory inner innodb input insert install instance instantiable instr interface interleaved intersect into invalidate invisible is is_free_lock is_ipv4 is_ipv4_compat is_not is_not_null is_used_lock isdate isnull isolation iterate java join json json_exists keep keep_duplicates key keys kill language large last last_day last_insert_id last_value lateral lax lcase lead leading least leaves left len lenght length less level levels library like like2 like4 likec limit lines link list listagg little ln load load_file lob lobs local localtime localtimestamp locate locator lock locked log log10 log2 logfile logfiles logging logical logical_reads_per_call logoff logon logs long loop low low_priority lower lpad lrtrim ltrim main make_set makedate maketime managed management manual map mapping mask master master_pos_wait match matched materialized max maxextents maximize maxinstances maxlen maxlogfiles maxloghistory maxlogmembers maxsize maxtrans md5 measures median medium member memcompress memory merge microsecond mid migration min minextents minimum mining minus minute minutes minvalue missing mod mode model modification modify module monitoring month months mount move movement multiset mutex name name_const names nan national native natural nav nchar nclob nested never new newline next nextval no no_write_to_binlog noarchivelog noaudit nobadfile nocheck nocompress nocopy nocycle nodelay nodiscardfile noentityescaping noguarantee nokeep nologfile nomapping nomaxvalue nominimize nominvalue nomonitoring none noneditionable nonschema noorder nopr nopro noprom nopromp noprompt norely noresetlogs noreverse normal norowdependencies noschemacheck noswitch not nothing notice notnull notrim novalidate now nowait nth_value nullif nulls num numb numbe nvarchar nvarchar2 object ocicoll ocidate ocidatetime ociduration ociinterval ociloblocator ocinumber ociref ocirefcursor ocirowid ocistring ocitype oct octet_length of off offline offset oid oidindex old on online only opaque open operations operator optimal optimize option optionally or oracle oracle_date oradata ord ordaudio orddicom orddoc order ordimage ordinality ordvideo organization orlany orlvary out outer outfile outline output over overflow overriding package pad parallel parallel_enable parameters parent parse partial partition partitions pascal passing password password_grace_time password_lock_time password_reuse_max password_reuse_time password_verify_function patch path patindex pctincrease pctthreshold pctused pctversion percent percent_rank percentile_cont percentile_disc performance period period_add period_diff permanent physical pi pipe pipelined pivot pluggable plugin policy position post_transaction pow power pragma prebuilt precedes preceding precision prediction prediction_cost prediction_details prediction_probability prediction_set prepare present preserve prior priority private private_sga privileges procedural procedure procedure_analyze processlist profiles project prompt protection public publishingservername purge quarter query quick quiesce quota quotename radians raise rand range rank raw read reads readsize rebuild record records recover recovery recursive recycle redo reduced ref reference referenced references referencing refresh regexp_like register regr_avgx regr_avgy regr_count regr_intercept regr_r2 regr_slope regr_sxx regr_sxy reject rekey relational relative relaylog release release_lock relies_on relocate rely rem remainder rename repair repeat replace replicate replication required reset resetlogs resize resource respect restore restricted result result_cache resumable resume retention return returning returns reuse reverse revoke right rlike role roles rollback rolling rollup round row row_count rowdependencies rowid rownum rows rtrim rules safe salt sample save savepoint sb1 sb2 sb4 scan schema schemacheck scn scope scroll sdo_georaster sdo_topo_geometry search sec_to_time second seconds section securefile security seed segment select self semi sequence sequential serializable server servererror session session_user sessions_per_user set sets settings sha sha1 sha2 share shared shared_pool short show shrink shutdown si_averagecolor si_colorhistogram si_featurelist si_positionalcolor si_stillimage si_texture siblings sid sign sin size size_t sizes skip slave sleep smalldatetimefromparts smallfile snapshot some soname sort soundex source space sparse spfile split sql sql_big_result sql_buffer_result sql_cache sql_calc_found_rows sql_small_result sql_variant_property sqlcode sqldata sqlerror sqlname sqlstate sqrt square standalone standby start starting startup statement static statistics stats_binomial_test stats_crosstab stats_ks_test stats_mode stats_mw_test stats_one_way_anova stats_t_test_ stats_t_test_indep stats_t_test_one stats_t_test_paired stats_wsr_test status std stddev stddev_pop stddev_samp stdev stop storage store stored str str_to_date straight_join strcmp strict string struct stuff style subdate subpartition subpartitions substitutable substr substring subtime subtring_index subtype success sum suspend switch switchoffset switchover sync synchronous synonym sys sys_xmlagg sysasm sysaux sysdate sysdatetimeoffset sysdba sysoper system system_user sysutcdatetime table tables tablespace tablesample tan tdo template temporary terminated tertiary_weights test than then thread through tier ties time time_format time_zone timediff timefromparts timeout timestamp timestampadd timestampdiff timezone_abbr timezone_minute timezone_region to to_base64 to_date to_days to_seconds todatetimeoffset trace tracking transaction transactional translate translation treat trigger trigger_nestlevel triggers trim truncate try_cast try_convert try_parse type ub1 ub2 ub4 ucase unarchived unbounded uncompress under undo unhex unicode uniform uninstall union unique unix_timestamp unknown unlimited unlock unnest unpivot unrecoverable unsafe unsigned until untrusted unusable unused update updated upgrade upped upper upsert url urowid usable usage use use_stored_outlines user user_data user_resources users using utc_date utc_timestamp uuid uuid_short validate validate_password_strength validation valist value values var var_samp varcharc vari varia variab variabl variable variables variance varp varraw varrawc varray verify version versions view virtual visible void wait wallet warning warnings week weekday weekofyear wellformed when whene whenev wheneve whenever where while whitespace window with within without work wrapped xdb xml xmlagg xmlattributes xmlcast xmlcolattval xmlelement xmlexists xmlforest xmlindex xmlnamespaces xmlpi xmlquery xmlroot xmlschema xmlserialize xmltable xmltype xor year year_to_month years yearweek",literal:"true false null unknown",built_in:"array bigint binary bit blob bool boolean char character date dec decimal float int int8 integer interval number numeric real record serial serial8 smallint text time timestamp tinyint varchar varying void"},c:[{cN:"string",b:"'",e:"'",c:[e.BE,{b:"''"}]},{cN:"string",b:'"',e:'"',c:[e.BE,{b:'""'}]},{cN:"string",b:"`",e:"`",c:[e.BE]},e.CNM,e.CBCM,t,e.HCM]},e.CBCM,t,e.HCM]}}),hljs.registerLanguage("python",function(e){var t={keyword:"and elif is global as in if from raise for except finally print import pass return exec else break not with class assert yield try while continue del or def lambda async await nonlocal|10",built_in:"Ellipsis NotImplemented",literal:"False None True"},r={cN:"meta",b:/^(>>>|\.\.\.) /},a={cN:"subst",b:/\{/,e:/\}/,k:t,i:/#/},n={cN:"string",c:[e.BE],v:[{b:/(u|b)?r?'''/,e:/'''/,c:[e.BE,r],r:10},{b:/(u|b)?r?"""/,e:/"""/,c:[e.BE,r],r:10},{b:/(fr|rf|f)'''/,e:/'''/,c:[e.BE,r,a]},{b:/(fr|rf|f)"""/,e:/"""/,c:[e.BE,r,a]},{b:/(u|r|ur)'/,e:/'/,r:10},{b:/(u|r|ur)"/,e:/"/,r:10},{b:/(b|br)'/,e:/'/},{b:/(b|br)"/,e:/"/},{b:/(fr|rf|f)'/,e:/'/,c:[e.BE,a]},{b:/(fr|rf|f)"/,e:/"/,c:[e.BE,a]},e.ASM,e.QSM]},i={cN:"number",r:0,v:[{b:e.BNR+"[lLjJ]?"},{b:"\\b(0o[0-7]+)[lLjJ]?"},{b:e.CNR+"[lLjJ]?"}]},s={cN:"params",b:/\(/,e:/\)/,c:["self",r,i,n]};return a.c=[n,i,r],{aliases:["py","gyp","ipython"],k:t,i:/(<\/|->|\?)|=>/,c:[r,i,n,e.HCM,{v:[{cN:"function",bK:"def"},{cN:"class",bK:"class"}],e:/:/,i:/[${=;\n,]/,c:[e.UTM,s,{b:/->/,eW:!0,k:"None"}]},{cN:"meta",b:/^[\t ]*@/,e:/$/},{b:/\b(print|exec)\(/}]}}),hljs.registerLanguage("xml",function(e){var t={eW:!0,i:/</,r:0,c:[{cN:"attr",b:"[A-Za-z0-9\\._:-]+",r:0},{b:/=\s*/,r:0,c:[{cN:"string",endsParent:!0,v:[{b:/"/,e:/"/},{b:/'/,e:/'/},{b:/[^\s"'=<>`]+/}]}]}]};return{aliases:["html","xhtml","rss","atom","xjb","xsd","xsl","plist"],cI:!0,c:[{cN:"meta",b:"<!DOCTYPE",e:">",r:10,c:[{b:"\\[",e:"\\]"}]},e.C("\x3c!--","--\x3e",{r:10}),{b:"<\\!\\[CDATA\\[",e:"\\]\\]>",r:10},{cN:"meta",b:/<\?xml/,e:/\?>/,r:10},{b:/<\?(php)?/,e:/\?>/,sL:"php",c:[{b:"/\\*",e:"\\*/",skip:!0},{b:'b"',e:'"',skip:!0},{b:"b'",e:"'",skip:!0},e.inherit(e.ASM,{i:null,cN:null,c:null,skip:!0}),e.inherit(e.QSM,{i:null,cN:null,c:null,skip:!0})]},{cN:"tag",b:"<style(?=\\s|>|$)",e:">",k:{name:"style"},c:[t],starts:{e:"</style>",rE:!0,sL:["css","xml"]}},{cN:"tag",b:"<script(?=\\s|>|$)",e:">",k:{name:"script"},c:[t],starts:{e:"<\/script>",rE:!0,sL:["actionscript","javascript","handlebars","xml"]}},{cN:"tag",b:"</?",e:"/?>",c:[{cN:"name",b:/[^\/><\s]+/,r:0},t]}]}}),hljs.registerLanguage("markdown",function(e){return{aliases:["md","mkdown","mkd"],c:[{cN:"section",v:[{b:"^#{1,6}",e:"$"},{b:"^.+?\\n[=-]{2,}$"}]},{b:"<",e:">",sL:"xml",r:0},{cN:"bullet",b:"^([*+-]|(\\d+\\.))\\s+"},{cN:"strong",b:"[*_]{2}.+?[*_]{2}"},{cN:"emphasis",v:[{b:"\\*.+?\\*"},{b:"_.+?_",r:0}]},{cN:"quote",b:"^>\\s+",e:"$"},{cN:"code",v:[{b:"^```w*s*$",e:"^```s*$"},{b:"`.+?`"},{b:"^( {4}|\t)",e:"$",r:0}]},{b:"^[-\\*]{3,}",e:"$"},{b:"\\[.+?\\][\\(\\[].*?[\\)\\]]",rB:!0,c:[{cN:"string",b:"\\[",e:"\\]",eB:!0,rE:!0,r:0},{cN:"link",b:"\\]\\(",e:"\\)",eB:!0,eE:!0},{cN:"symbol",b:"\\]\\[",e:"\\]",eB:!0,eE:!0}],r:10},{b:/^\[[^\n]+\]:/,rB:!0,c:[{cN:"symbol",b:/\[/,e:/\]/,eB:!0,eE:!0},{cN:"link",b:/:\s*/,e:/$/,eB:!0}]}]}}),hljs.registerLanguage("css",function(e){var t={b:/[A-Z\_\.\-]+\s*:/,rB:!0,e:";",eW:!0,c:[{cN:"attribute",b:/\S/,e:":",eE:!0,starts:{eW:!0,eE:!0,c:[{b:/[\w-]+\(/,rB:!0,c:[{cN:"built_in",b:/[\w-]+/},{b:/\(/,e:/\)/,c:[e.ASM,e.QSM]}]},e.CSSNM,e.QSM,e.ASM,e.CBCM,{cN:"number",b:"#[0-9A-Fa-f]+"},{cN:"meta",b:"!important"}]}}]};return{cI:!0,i:/[=\/|'\$]/,c:[e.CBCM,{cN:"selector-id",b:/#[A-Za-z0-9_-]+/},{cN:"selector-class",b:/\.[A-Za-z0-9_-]+/},{cN:"selector-attr",b:/\[/,e:/\]/,i:"$"},{cN:"selector-pseudo",b:/:(:)?[a-zA-Z0-9\_\-\+\(\)"'.]+/},{b:"@(font-face|page)",l:"[a-z-]+",k:"font-face page"},{b:"@",e:"[{;]",i:/:/,c:[{cN:"keyword",b:/\w+/},{b:/\s/,eW:!0,eE:!0,r:0,c:[e.ASM,e.QSM,e.CSSNM]}]},{cN:"selector-tag",b:"[a-zA-Z-][a-zA-Z0-9_-]*",r:0},{b:"{",e:"}",i:/\S/,c:[e.CBCM,t]}]}}),hljs.registerLanguage("json",function(e){var t={literal:"true false null"},r=[e.QSM,e.CNM],a={e:",",eW:!0,eE:!0,c:r,k:t},n={b:"{",e:"}",c:[{cN:"attr",b:/"/,e:/"/,c:[e.BE],i:"\\n"},e.inherit(a,{b:/:/})],i:"\\S"},i={b:"\\[",e:"\\]",c:[e.inherit(a)],i:"\\S"};return r.splice(r.length,0,n,i),{c:r,k:t,i:"\\S"}}),hljs.registerLanguage("javascript",function(e){var t="[A-Za-z$_][0-9A-Za-z$_]*",r={keyword:"in of if for while finally var new function do return void else break catch instanceof with throw case default try this switch continue typeof delete let yield const export super debugger as async await static import from as",literal:"true false null undefined NaN Infinity",built_in:"eval isFinite isNaN parseFloat parseInt decodeURI decodeURIComponent encodeURI encodeURIComponent escape unescape Object Function Boolean Error EvalError InternalError RangeError ReferenceError StopIteration SyntaxError TypeError URIError Number Math Date String RegExp Array Float32Array Float64Array Int16Array Int32Array Int8Array Uint16Array Uint32Array Uint8Array Uint8ClampedArray ArrayBuffer DataView JSON Intl arguments require module console window document Symbol Set Map WeakSet WeakMap Proxy Reflect Promise"},a={cN:"number",v:[{b:"\\b(0[bB][01]+)"},{b:"\\b(0[oO][0-7]+)"},{b:e.CNR}],r:0},n={cN:"subst",b:"\\$\\{",e:"\\}",k:r,c:[]},i={cN:"string",b:"`",e:"`",c:[e.BE,n]};n.c=[e.ASM,e.QSM,i,a,e.RM];var s=n.c.concat([e.CBCM,e.CLCM]);return{aliases:["js","jsx"],k:r,c:[{cN:"meta",r:10,b:/^\s*['"]use (strict|asm)['"]/},{cN:"meta",b:/^#!/,e:/$/},e.ASM,e.QSM,i,e.CLCM,e.CBCM,a,{b:/[{,]\s*/,r:0,c:[{b:t+"\\s*:",rB:!0,r:0,c:[{cN:"attr",b:t,r:0}]}]},{b:"("+e.RSR+"|\\b(case|return|throw)\\b)\\s*",k:"return throw case",c:[e.CLCM,e.CBCM,e.RM,{cN:"function",b:"(\\(.*?\\)|"+t+")\\s*=>",rB:!0,e:"\\s*=>",c:[{cN:"params",v:[{b:t},{b:/\(\s*\)/},{b:/\(/,e:/\)/,eB:!0,eE:!0,k:r,c:s}]}]},{b:/</,e:/(\/\w+|\w+\/)>/,sL:"xml",c:[{b:/<\w+\s*\/>/,skip:!0},{b:/<\w+/,e:/(\/\w+|\w+\/)>/,skip:!0,c:[{b:/<\w+\s*\/>/,skip:!0},"self"]}]}],r:0},{cN:"function",bK:"function",e:/\{/,eE:!0,c:[e.inherit(e.TM,{b:t}),{cN:"params",b:/\(/,e:/\)/,eB:!0,eE:!0,c:s}],i:/\[|%/},{b:/\$[(.]/},e.METHOD_GUARD,{cN:"class",bK:"class",e:/[{;=]/,eE:!0,i:/[:"\[\]]/,c:[{bK:"extends"},e.UTM]},{bK:"constructor get set",e:/\{/,eE:!0}],i:/#(?!!)/}});